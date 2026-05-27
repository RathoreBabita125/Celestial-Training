import { connection } from '../../database/connection.js'
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

export const loginRoute = async (req, res) => {
    // console.log(req.body)
    try {
        const { name, email, password } = req.body
        const userData = await connection.query(`select * from userProfile where email=$1`, [email])

        if (userData.rows.length === 0) {
            return res.json({
                status: 'Invalid credential'
            })
        }

        const isAlreadyUser = await bcrypt.compare(password, userData.rows[0].password)

        if (!isAlreadyUser) {
            return res.json({
                status: 'Invalid email and password'
            })
        }

        const refreshToken = jwt.sign(
            {
                fullName: userData.rows[0].fullName
            },
            'private key',
            {
                expiresIn: '1d'
            }
        )

        


        const accessToken = jwt.sign(
            {
                fullName: userData.rows[0].fullName,
                email: userData.rows[0].email
            },
            'private key',
            {
                expiresIn: '10m'
            }
        )

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000
        })

        return res.json({
            status: 'You are logined now successfully',
            accessToken
        })

    } catch (error) {
        res.json({
            status: `something wrong ${error}`
        })
    }
}