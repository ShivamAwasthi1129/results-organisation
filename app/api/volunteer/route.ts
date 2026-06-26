import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

export async function POST(req: Request) {
  try {
    const data = await req.json()
    
    // Always set status to PENDING per documentation
    data.status = "PENDING"

    // 1. Forward request to backend
    const backendUrl = process.env.DOMAIN_NAME || "https://r3sults-backend.vercel.app"
    const backendRes = await fetch(`${backendUrl}/api/admin/volunteer-mgmt`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })

    if (!backendRes.ok) {
      const errorData = await backendRes.json().catch(() => ({}))
      console.error("Backend registration failed:", errorData)
      return NextResponse.json({ success: false, message: "Failed to register volunteer on backend" }, { status: backendRes.status })
    }

    const backendData = await backendRes.json()

    // 2. Send confirmation email
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_ID,
        pass: process.env.EMAIL_PASS,
      },
    })

    try {
      await transporter.verify()
    } catch (verifyError) {
      console.error("Nodemailer verification failed:", verifyError)
      // We'll still try to send the email, but log the error
    }

    const mailOptions = {
      from: `"R3sults Team" <${process.env.EMAIL_ID}>`,
      to: data.email,
      subject: "Volunteer Registration Received",
      text: `Hello ${data.firstName},\n\nThank you for registering as a volunteer with R3sults. Your application has been received and is currently pending administrator verification. We will review your submission and let you know soon.\n\nBest regards,\nThe R3sults Team`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2>Volunteer Registration Received</h2>
          <p>Hello ${data.firstName},</p>
          <p>Thank you for registering as a volunteer with R3sults. Your application has been received and is currently pending administrator verification.</p>
          <p>We will review your submission and let you know soon.</p>
          <p>Best regards,<br><strong>The R3sults Team</strong></p>
        </div>
      `,
    }

    await transporter.sendMail(mailOptions)

    return NextResponse.json({
      success: true,
      message: "Registration successful and email sent.",
      data: backendData.data
    })
  } catch (error) {
    console.error("Error in volunteer registration API:", error)
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
  }
}
