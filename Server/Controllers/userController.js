const { json } = require("express");
const userModel = require("../Models/userModel");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { genertaeOtp } = require("../Utility/otpGen");
const { sendMail } = require("../Utility/SendOTP");
const jwt = require("jsonwebtoken");
const secretKey = process.env.SECRETKEY;
const sendEmail = require('./../Utility/sendEmail')
const otpTemplate = require("./../template/otppage")


// Send OTP
exports.sendOTP = async (req, res) => {
    try {
        const {Email} = req.body;
        const generatedOTP = await genertaeOtp();
        console.log(generatedOTP);
        const savedUser = await userModel.findOneAndUpdate({ Email }, {Email, OTP:generatedOTP, createdAt: new Date() }, { upsert: true, new: true, runValidators: true});
        if (generatedOTP) {
            await sendEmail({
            to: Email,
            subject: "Verify Your Email",
            html: otpTemplate(generatedOTP, Email),
        });
        }
        console.log("Saved document:", savedUser);
        
        return res.status(200).json({ Email, message: "Create Account Successfull" });
    }
    catch (error) {
        console.log(error.message);
        return res.status(500).json({message: "Internal Server Error on OTP Varification", error });
    }
}


//Create User
exports.createUser = async (req, res) => {
    try {
        const { Email, Password, Photo, OTP, ...restData } = req.body;
        const existUser = await userModel.findOne({ Email });
        if (existUser) {
            console.log("User Exists");
            const match = existUser.OTP === OTP;
            if (match) {
                await userModel.findOneAndUpdate(
                    { Email },
                    {$set:
                        {...restData,
                            Password: bcrypt.hashSync(Password, bcrypt.genSaltSync(10)),
                            isRegistered:true
                        }
                    },
                    { new: true }
                );
                return res.status(200).json({Email, message: "Account updated successfully with OTP match!",});
            }
            else {
                await userModel.findOneAndDelete({Email});
                return res.status(400).json({ message: "Invalid OTP!" });
            }
        }
    } catch (err) {
        console.error("Error:", err.message);
        return res.status(500).json({ message: "Internal Server Error", err });
    }
};


// Recover Psssword
exports.recoverPassword = async (req, res) => {
    console.log(req.body);
    try {
        const { Email, OTP, Password } = req.body;
        const existUser = await userModel.findOne({ Email });
        if (!existUser) {
            return res.status(404).json({ message: "User not found!" });
        }
        if (existUser && existUser.isRegistered) {
            const matchOTP = existUser.OTP == OTP;
            if (matchOTP ) {
                await userModel.findOneAndUpdate({ Email },{$set: {Password: bcrypt.hashSync(Password, bcrypt.genSaltSync(10))}},
                        { new: true }
                    );
                return res.status(200).json({Email, message: "Password Change Successfully!",});
            }
            else {
                return res.status(400).json({ message: "Invalid OTP!" });
            }
        }
        else {
            return res.status(400).json({ message: "Please Complete Your Registration" });
        }

    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ message: "Internal Server Error", error });
    }
};


// Login User
exports.loginUser = async (req, res) => {
    const { Email, Password } = req.body
    const user = await userModel.findOne({ Email })
    if (!user) {
        return res.status(400).json({ message: "please Signup" });
    }
    const dataBasePassword = user.Password;
    const matchPassword = await bcrypt.compare(Password, dataBasePassword);
    if (!matchPassword) {
        return res.status(400).json({ message: "invalid credentials" });
    }
    const token = jwt.sign({ id: user._id }, secretKey, { expiresIn: "30m" });
    return res.status(200).json({ token,user, message: "user login successfully" });
};


// Fetch user
exports.fetchUser = async (req, res) => {
    try {
        const user = req.user;
        res.json(user);
        console.log(user);
    } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({ message: "Server Error" });
    }
};


// // Change Psssword
// exports.changePassword = async (req, res) => {
//     console.log(req.body);
//     try {
//         const { Email, oldpass, newpass } = req.body;
//         const existUser = await userModel.findOne({ Email });
//         if (existUser) {
//             const dataBasePassword = existUser.Password;
//             const matchPassword = await bcrypt.compare(oldpass, dataBasePassword);
//             if (matchPassword) {
//                 const updatedUser = await userModel.findOneAndUpdate({ Email },{$set: {Password: bcrypt.hashSync(newpass, bcrypt.genSaltSync(10))}},
//                     { new: true }
//                 );
//                 return res.status(200).json({Email, message: "Password Change Successfully!",});
//             }
//             else {
//                 return res.status(400).json({ message: "Invalid Old Password!" });
//             }
//         }
//     } catch (err) {
//         console.error("Error:", err);
//         return res.status(500).json({ message: "Internal Server Error", err });
//     }
// };



// Change Psssword
exports.changePassword = async (req, res) => {
    try {
        console.log(req.body);
        const { Email, oldPassword, newPassword } = req.body;
        const existUser = await userModel.findOne({ Email });
        if (existUser) {
            const dataBasePassword = existUser.Password;
            const matchPassword = await bcrypt.compare(oldPassword, dataBasePassword);
            if (matchPassword) {
                await userModel.findOneAndUpdate({ Email },{$set: {Password: bcrypt.hashSync(newPassword, bcrypt.genSaltSync(10))}},
                    { new: true }
                );
                return res.status(200).json({Email, message: "Password Change Successfully!",});
            }
            else {
                return res.status(400).json({ message: "Invalid Old Password!" });
            }
        }
    }
    catch (err) {
        console.error("Error:", err);
        return res.status(500).json({ message: "Internal Server Error", err });
    }
};


// Recover OTP Varification
exports.recoverOTPVarification = async (req, res) => {
    const {Email} = req.body;
    const existUser = await userModel.findOne({ Email });
        if (!existUser) {
            return res.status(404).json({ message: "User Not Exist" });
        }
        const randotp = await genertaeOtp();
        if (randotp) {
            sendMail(`${Email}`, "Task Board OTP", `${randotp}`);
            const addOTP = await userModel.findOneAndUpdate({ Email },{$set: {OTP: randotp}},
                { new: true }
            );
            return res.status(200).json({Email, message: "Account updated successfully with OTP match!",});
        }
};


 // Edit profile
exports.editProfile = async (req, res) => {
    console.log(req.body);
    try {
        const { Email, oldpass, newpass } = req.body;
        const existUser = await userModel.findOne({ Email });
        if (existUser) {
            const dataBasePassword = existUser.Password;
            const matchPassword = await bcrypt.compare(oldpass, dataBasePassword);
            if (matchPassword) {
                const updatedUser = await userModel.findOneAndUpdate({ Email },{$set: {Password: bcrypt.hashSync(newpass, bcrypt.genSaltSync(10))}},
                    { new: true }
                );
                return res.status(200).json({Email, message: "Password Change Successfully!",});
            }
            else {
                return res.status(400).json({ message: "Invalid Old Password!" });
            }
        }
    } catch (err) {
        console.error("Error:", err);
        return res.status(500).json({ message: "Internal Server Error", err });
    }
};
