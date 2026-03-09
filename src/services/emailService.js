// Email Service using EmailJS
// Setup: 
// 1. Go to https://www.emailjs.com/
// 2. Sign up for free account
// 3. Get your Service ID, Template ID, and Public Key
// 4. Replace the credentials below

// Replace these with your actual EmailJS credentials
const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID' // e.g., 'service_xxxxx'
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID' // e.g., 'template_xxxxx'
const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY' // e.g., 'xxxxx'

// Initialize EmailJS (only if properly configured)
let emailJsInitialized = false

const initializeEmailJS = () => {
  if (typeof emailjs !== 'undefined' && EMAILJS_PUBLIC_KEY !== 'YOUR_PUBLIC_KEY') {
    emailjs.init(EMAILJS_PUBLIC_KEY)
    emailJsInitialized = true
  }
}

export const sendOtpEmail = async (email, otp) => {
  try {
    // If EmailJS is not configured, simulate email sending
    if (!emailJsInitialized || EMAILJS_PUBLIC_KEY === 'YOUR_PUBLIC_KEY') {
      console.log(`[Simulated] Email sent to ${email}`)
      console.log(`[Simulated] OTP Code: ${otp}`)
      return true
    }

    // Send using EmailJS
    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      {
        to_email: email,
        otp_code: otp,
        message: `Mã xác nhận của bạn là: ${otp}. Mã này sẽ hết hạn sau 10 phút.`
      }
    )

    console.log('Email sent successfully:', response)
    return true
  } catch (error) {
    console.error('Failed to send email:', error)
    return false
  }
}

// Send a simple notification email (subject + message)
export const sendSimpleEmail = async (email, subject, message) => {
  try {
    if (!emailJsInitialized || EMAILJS_PUBLIC_KEY === 'YOUR_PUBLIC_KEY') {
      console.log(`[Simulated] Email to: ${email}`)
      console.log(`[Simulated] Subject: ${subject}`)
      console.log(`[Simulated] Message: ${message}`)
      return true
    }

    // If EmailJS configured, use template with subject/message fields
    const response = await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
      to_email: email,
      subject,
      message
    })

    console.log('Email sent successfully:', response)
    return true
  } catch (error) {
    console.error('Failed to send email:', error)
    return false
  }
}

// Alternative: Using a backend API
export const sendOtpEmailViaBackend = async (email, otp) => {
  try {
    const response = await fetch('http://your-backend-api.com/api/send-otp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        otp: otp
      })
    })

    if (response.ok) {
      const data = await response.json()
      console.log('OTP sent successfully:', data)
      return true
    } else {
      console.error('Failed to send OTP:', response.statusText)
      return false
    }
  } catch (error) {
    console.error('Error sending OTP:', error)
    return false
  }
}

// Verify OTP (check if it matches and hasn't expired)
export const verifyOTP = (inputOtp, generatedOtp, expireTime) => {
  if (!inputOtp || inputOtp !== generatedOtp) {
    return { valid: false, message: 'Mã xác nhận không chính xác' }
  }

  if (Date.now() > expireTime) {
    return { valid: false, message: 'Mã xác nhận đã hết hạn' }
  }

  return { valid: true, message: 'Mã xác nhận hợp lệ' }
}

export default {
  sendOtpEmail,
  sendOtpEmailViaBackend,
  verifyOTP,
  initializeEmailJS
}
