import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export interface EmailTemplate {
  to: string
  subject: string
  html: string
}

export class EmailService {
  private static instance: EmailService

  public static getInstance(): EmailService {
    if (!EmailService.instance) {
      EmailService.instance = new EmailService()
    }
    return EmailService.instance
  }

  /**
   * Send referral confirmation email
   */
  async sendReferralConfirmation(referrerEmail: string, clientName: string, referralId: string) {
    const template = this.getReferralConfirmationTemplate(referrerEmail, clientName, referralId)
    return await this.sendEmail(template)
  }

  /**
   * Send therapist approval email
   */
  async sendTherapistApproval(therapistEmail: string, therapistName: string) {
    const template = this.getTherapistApprovalTemplate(therapistEmail, therapistName)
    return await this.sendEmail(template)
  }

  /**
   * Send therapist rejection email
   */
  async sendTherapistRejection(therapistEmail: string, therapistName: string, reason?: string) {
    const template = this.getTherapistRejectionTemplate(therapistEmail, therapistName, reason)
    return await this.sendEmail(template)
  }

  /**
   * Send booking confirmation email
   */
  async sendBookingConfirmation(
    clientEmail: string, 
    clientName: string, 
    therapistName: string, 
    appointmentDate: string,
    meetingLink?: string
  ) {
    const template = this.getBookingConfirmationTemplate(
      clientEmail, 
      clientName, 
      therapistName, 
      appointmentDate,
      meetingLink
    )
    return await this.sendEmail(template)
  }

  /**
   * Send match notification to referrer
   */
  async sendMatchNotification(
    referrerEmail: string,
    clientName: string,
    therapistName: string,
    therapistBio: string,
    bookingLink: string
  ) {
    const template = this.getMatchNotificationTemplate(
      referrerEmail,
      clientName,
      therapistName,
      therapistBio,
      bookingLink
    )
    return await this.sendEmail(template)
  }

  /**
   * Send match notification to therapist
   */
  async sendTherapistMatchNotification(
    therapistEmail: string,
    clientName: string,
    clientAge: number,
    issueType: string,
    urgency: string,
    bookingLink: string
  ) {
    const template = this.getTherapistMatchNotificationTemplate(
      therapistEmail,
      clientName,
      clientAge,
      issueType,
      urgency,
      bookingLink
    )
    return await this.sendEmail(template)
  }

  /**
   * Generic email sending method
   */
  private async sendEmail(template: EmailTemplate) {
    try {
      const { data, error } = await resend.emails.send({
        from: 'MindMatch <noreply@mindmatch.ie>',
        to: [template.to],
        subject: template.subject,
        html: template.html,
      })

      if (error) {
        console.error('Error sending email:', error)
        return { success: false, error }
      }

      return { success: true, data }
    } catch (error) {
      console.error('Error sending email:', error)
      return { success: false, error }
    }
  }

  /**
   * Get referral confirmation email template
   */
  private getReferralConfirmationTemplate(referrerEmail: string, clientName: string, referralId: string): EmailTemplate {
    return {
      to: referrerEmail,
      subject: 'Referral Submitted Successfully - MindMatch',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Referral Confirmation</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 28px;">MindMatch</h1>
            <p style="color: white; margin: 10px 0 0 0; opacity: 0.9;">Rapid Mental Health Support</p>
          </div>
          
          <div style="background: white; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
            <h2 style="color: #2563eb; margin-top: 0;">Referral Submitted Successfully</h2>
            
            <p>Thank you for submitting a referral for <strong>${clientName}</strong>. We have received your request and our clinical team will begin the matching process within 24 hours.</p>
            
            <div style="background: #f0f9ff; border-left: 4px solid #2563eb; padding: 20px; margin: 20px 0; border-radius: 4px;">
              <h3 style="margin-top: 0; color: #1e40af;">What happens next?</h3>
              <ul style="margin: 0; padding-left: 20px;">
                <li>Our clinical team reviews your referral</li>
                <li>We match you with verified therapists</li>
                <li>You'll receive therapist options within 24 hours</li>
                <li>Book your first session directly with your chosen therapist</li>
              </ul>
            </div>
            
            <div style="background: #fef3c7; border: 1px solid #f59e0b; padding: 15px; border-radius: 6px; margin: 20px 0;">
              <p style="margin: 0; color: #92400e;"><strong>Reference ID:</strong> ${referralId}</p>
            </div>
            
            <p>If you have any questions or need immediate support, please don't hesitate to contact us.</p>
            
            <div style="text-align: center; margin-top: 30px;">
              <a href="https://mindmatch.ie" style="background: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">Visit MindMatch</a>
            </div>
            
            <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
            
            <p style="font-size: 12px; color: #6b7280; text-align: center;">
              MindMatch facilitates connections between clients and therapists. We are not a healthcare provider and do not provide medical advice.<br>
              If this is a crisis situation, please contact emergency services or the Samaritans at 116 123.
            </p>
          </div>
        </body>
        </html>
      `
    }
  }

  /**
   * Get therapist approval email template
   */
  private getTherapistApprovalTemplate(therapistEmail: string, therapistName: string): EmailTemplate {
    return {
      to: therapistEmail,
      subject: 'Welcome to MindMatch - Your Application Has Been Approved',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Therapist Approval</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 28px;">MindMatch</h1>
            <p style="color: white; margin: 10px 0 0 0; opacity: 0.9;">Rapid Mental Health Support</p>
          </div>
          
          <div style="background: white; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
            <h2 style="color: #059669; margin-top: 0;">Welcome to MindMatch!</h2>
            
            <p>Dear ${therapistName},</p>
            
            <p>Congratulations! Your application to join the MindMatch network has been approved. We're excited to have you as part of our team of verified therapists helping young people access mental health support.</p>
            
            <div style="background: #f0fdf4; border-left: 4px solid #10b981; padding: 20px; margin: 20px 0; border-radius: 4px;">
              <h3 style="margin-top: 0; color: #047857;">Next Steps</h3>
              <ul style="margin: 0; padding-left: 20px;">
                <li>Complete your therapist profile</li>
                <li>Set your availability calendar</li>
                <li>Start receiving matched referrals</li>
                <li>Begin helping young people in need</li>
              </ul>
            </div>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="https://mindmatch.ie/therapist-dashboard" style="background: #10b981; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">Access Your Dashboard</a>
            </div>
            
            <p>Thank you for joining us in our mission to eliminate unacceptable delays in mental health access.</p>
            
            <p>Best regards,<br>The MindMatch Team</p>
          </div>
        </body>
        </html>
      `
    }
  }

  /**
   * Get therapist rejection email template
   */
  private getTherapistRejectionTemplate(therapistEmail: string, therapistName: string, reason?: string): EmailTemplate {
    return {
      to: therapistEmail,
      subject: 'MindMatch Application Update',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Application Update</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 28px;">MindMatch</h1>
            <p style="color: white; margin: 10px 0 0 0; opacity: 0.9;">Rapid Mental Health Support</p>
          </div>
          
          <div style="background: white; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
            <h2 style="color: #dc2626; margin-top: 0;">Application Update</h2>
            
            <p>Dear ${therapistName},</p>
            
            <p>Thank you for your interest in joining the MindMatch network. After careful review of your application, we are unable to approve your request at this time.</p>
            
            ${reason ? `
              <div style="background: #fef2f2; border-left: 4px solid #dc2626; padding: 20px; margin: 20px 0; border-radius: 4px;">
                <h3 style="margin-top: 0; color: #991b1b;">Reason</h3>
                <p style="margin: 0; color: #7f1d1d;">${reason}</p>
              </div>
            ` : ''}
            
            <p>We encourage you to reapply in the future if your circumstances change or if you obtain additional qualifications.</p>
            
            <p>Thank you for your understanding.</p>
            
            <p>Best regards,<br>The MindMatch Team</p>
          </div>
        </body>
        </html>
      `
    }
  }

  /**
   * Get booking confirmation email template
   */
  private getBookingConfirmationTemplate(
    clientEmail: string, 
    clientName: string, 
    therapistName: string, 
    appointmentDate: string,
    meetingLink?: string
  ): EmailTemplate {
    return {
      to: clientEmail,
      subject: 'Session Confirmed - MindMatch',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Session Confirmation</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 28px;">MindMatch</h1>
            <p style="color: white; margin: 10px 0 0 0; opacity: 0.9;">Rapid Mental Health Support</p>
          </div>
          
          <div style="background: white; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
            <h2 style="color: #2563eb; margin-top: 0;">Session Confirmed</h2>
            
            <p>Hello ${clientName},</p>
            
            <p>Your session with <strong>${therapistName}</strong> has been confirmed.</p>
            
            <div style="background: #f0f9ff; border: 1px solid #2563eb; padding: 20px; margin: 20px 0; border-radius: 6px;">
              <h3 style="margin-top: 0; color: #1e40af;">Session Details</h3>
              <p style="margin: 5px 0;"><strong>Date & Time:</strong> ${new Date(appointmentDate).toLocaleString()}</p>
              <p style="margin: 5px 0;"><strong>Therapist:</strong> ${therapistName}</p>
              ${meetingLink ? `<p style="margin: 5px 0;"><strong>Meeting Link:</strong> <a href="${meetingLink}">Join Session</a></p>` : ''}
            </div>
            
            <div style="background: #fef3c7; border: 1px solid #f59e0b; padding: 15px; border-radius: 6px; margin: 20px 0;">
              <p style="margin: 0; color: #92400e;"><strong>Important:</strong> Please join the session 5 minutes early to ensure everything is working properly.</p>
            </div>
            
            <p>If you need to reschedule or cancel, please contact your therapist directly or reply to this email.</p>
            
            <p>We hope this session is helpful for you.</p>
            
            <p>Best regards,<br>The MindMatch Team</p>
          </div>
        </body>
        </html>
      `
    }
  }

  /**
   * Get match notification email template for referrer
   */
  private getMatchNotificationTemplate(
    referrerEmail: string,
    clientName: string,
    therapistName: string,
    therapistBio: string,
    bookingLink: string
  ): EmailTemplate {
    return {
      to: referrerEmail,
      subject: 'Therapist Match Found - MindMatch',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Therapist Match</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 28px;">MindMatch</h1>
            <p style="color: white; margin: 10px 0 0 0; opacity: 0.9;">Rapid Mental Health Support</p>
          </div>
          
          <div style="background: white; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
            <h2 style="color: #2563eb; margin-top: 0;">Great News! We Found a Match</h2>
            
            <p>We've found a verified therapist for <strong>${clientName}</strong>:</p>
            
            <div style="background: #f0f9ff; border: 1px solid #2563eb; padding: 20px; margin: 20px 0; border-radius: 6px;">
              <h3 style="margin-top: 0; color: #1e40af;">${therapistName}</h3>
              <p style="margin: 0;">${therapistBio}</p>
            </div>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${bookingLink}" style="background: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">Book Session</a>
            </div>
            
            <p>You can book a session directly with this therapist. If you'd like to see other options, please let us know.</p>
            
            <p>Best regards,<br>The MindMatch Team</p>
          </div>
        </body>
        </html>
      `
    }
  }

  /**
   * Get match notification email template for therapist
   */
  private getTherapistMatchNotificationTemplate(
    therapistEmail: string,
    clientName: string,
    clientAge: number,
    issueType: string,
    urgency: string,
    bookingLink: string
  ): EmailTemplate {
    return {
      to: therapistEmail,
      subject: 'New Client Match - MindMatch',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New Client Match</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 28px;">MindMatch</h1>
            <p style="color: white; margin: 10px 0 0 0; opacity: 0.9;">Rapid Mental Health Support</p>
          </div>
          
          <div style="background: white; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
            <h2 style="color: #2563eb; margin-top: 0;">New Client Match</h2>
            
            <p>You have a new potential client match:</p>
            
            <div style="background: #f0f9ff; border: 1px solid #2563eb; padding: 20px; margin: 20px 0; border-radius: 6px;">
              <h3 style="margin-top: 0; color: #1e40af;">Client Information</h3>
              <p style="margin: 5px 0;"><strong>Name:</strong> ${clientName}</p>
              <p style="margin: 5px 0;"><strong>Age:</strong> ${clientAge}</p>
              <p style="margin: 5px 0;"><strong>Issue:</strong> ${issueType}</p>
              <p style="margin: 5px 0;"><strong>Urgency:</strong> ${urgency}</p>
            </div>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${bookingLink}" style="background: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">View Details & Accept</a>
            </div>
            
            <p>Please review the client details and accept the match if you're available to help.</p>
            
            <p>Best regards,<br>The MindMatch Team</p>
          </div>
        </body>
        </html>
      `
    }
  }
}

export const emailService = EmailService.getInstance()
