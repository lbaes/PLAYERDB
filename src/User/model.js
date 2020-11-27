const { model, Schema } = require('mongoose');
const bcrypt = require('bcrypt');
SALT_WORK_FACTOR = 10;

const userSchema = new Schema({
    username: { type: String, required: true, index: { unique: true } },
    password: { type: String, required: true }
})


// Before saving to database make some tests
userSchema.pre('save', async function () {
    var user = this;

    // Check if the password wasn't modified
    if (!user.isModified('password')) {
        console.log('<' + user.username + ', ' + user._id + '>' + 'password was not modified, no need to rehash')
        return;
    }

    // password was modified or is new

    try {
        // generate salt
        salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
        // hash the password using the new salt
        hash = await bcrypt.hash(user.password, salt);
        user.password = hash;
    } catch (err) {
        console.log("Error while hashing password");
        throw new Error("bcrypt error");
    }

});


//https://www.mongodb.com/blog/post/password-authentication-with-mongoose-part-1
userSchema.methods.comparePassword = function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
}

module.exports = model('User', userSchema);