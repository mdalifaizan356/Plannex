const otpTemplate = (otp, name) => {
  return `
    <div style="
      margin: 0;
      padding: 40px 20px;
      background-color: #f4f6f8;
      font-family: Arial, Helvetica, sans-serif;
    ">

      <div style="
        max-width: 520px;
        margin: 0 auto;
        background-color: #ffffff;
        border-radius: 16px;
        overflow: hidden;
        box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
      ">

        <!-- Header -->
        <div style="
          padding: 28px 30px;
          background-color: #111827;
          text-align: center;
        ">
          <h1 style="
            margin: 0;
            color: #ffffff;
            font-size: 24px;
            font-weight: 700;
            letter-spacing: 1px;
          ">
            Plannex
          </h1>

          <p style="
            margin: 8px 0 0;
            color: #9ca3af;
            font-size: 13px;
          ">
            Secure Account Verification
          </p>
        </div>

        <!-- Content -->
        <div style="
          padding: 38px 35px;
          text-align: center;
        ">

          <div style="
            width: 52px;
            height: 52px;
            margin: 0 auto 20px;
            background-color: #f3f4f6;
            border-radius: 50%;
            line-height: 52px;
            font-size: 24px;
          ">
            🔐
          </div>

          <h2 style="
            margin: 0 0 12px;
            color: #111827;
            font-size: 23px;
          ">
            Verify Your Email
          </h2>

          <p style="
            margin: 0 0 8px;
            color: #374151;
            font-size: 15px;
          ">
            Hello <strong>${name}</strong>,
          </p>

          <p style="
            margin: 0 auto 28px;
            max-width: 400px;
            color: #6b7280;
            font-size: 14px;
            line-height: 1.7;
          ">
            We received a request to verify your email address.
            Enter the verification code below to continue.
          </p>

          <!-- OTP -->
          <div style="
            display: inline-block;
            padding: 18px 30px;
            background-color: #f9fafb;
            border: 1px solid #e5e7eb;
            border-radius: 12px;
            margin-bottom: 20px;
          ">
            <div style="
              color: #9ca3af;
              font-size: 11px;
              font-weight: 600;
              letter-spacing: 2px;
              margin-bottom: 8px;
            ">
              VERIFICATION CODE
            </div>

            <div style="
              color: #111827;
              font-size: 32px;
              font-weight: 700;
              letter-spacing: 9px;
            ">
              ${otp}
            </div>
          </div>

          <!-- Expiry -->
          <div style="
            margin: 5px auto 25px;
            padding: 11px 15px;
            max-width: 350px;
            background-color: #fff7ed;
            border: 1px solid #fed7aa;
            border-radius: 8px;
          ">
            <p style="
              margin: 0;
              color: #9a3412;
              font-size: 13px;
            ">
              ⏱ This code will expire in <strong>5 minutes</strong>.
            </p>
          </div>

          <p style="
            margin: 0;
            color: #9ca3af;
            font-size: 12px;
            line-height: 1.6;
          ">
            For your security, never share this verification code
            with anyone.
          </p>

        </div>

        <!-- Footer -->
        <div style="
          padding: 20px 30px;
          background-color: #f9fafb;
          border-top: 1px solid #f0f0f0;
          text-align: center;
        ">

          <p style="
            margin: 0 0 7px;
            color: #6b7280;
            font-size: 12px;
          ">
            Didn't request this verification?
          </p>

          <p style="
            margin: 0;
            color: #9ca3af;
            font-size: 11px;
          ">
            You can safely ignore this email.
          </p>

          <p style="
            margin: 15px 0 0;
            color: #d1d5db;
            font-size: 11px;
          ">
            © 2026 ain360. All rights reserved.
          </p>

        </div>

      </div>

    </div>
  `;
};

module.exports = otpTemplate;

