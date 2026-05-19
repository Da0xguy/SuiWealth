interface EmailPayload {
  email: string;
  recipientName: string;
  protocolName: string;
  expectedYield: string;
  investmentAmount: string;
  confirmationLink: string;
}

export async function sendInvestmentConfirmationEmail(
  payload: EmailPayload
): Promise<{ success: boolean; messageId?: string; error?: string }> {
  try {
    // In production, this would call your backend email service
    // For now, we'll simulate the email send with a console log and return success
    console.log("📧 Sending investment confirmation email to:", payload.email);
    console.log("Email details:", {
      protocolName: payload.protocolName,
      expectedYield: payload.expectedYield,
      investmentAmount: payload.investmentAmount,
      confirmationLink: payload.confirmationLink,
    });

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Generate a mock message ID
    const messageId = `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // In production, you would do something like:
    // const response = await fetch('/api/email/send-investment-confirmation', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(payload)
    // });

    return {
      success: true,
      messageId,
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return {
      success: false,
      error: errorMessage,
    };
  }
}

export function generateConfirmationToken(): string {
  return `token_${Date.now()}_${Math.random().toString(36).substr(2, 16)}`;
}

export function generateConfirmationLink(token: string): string {
  // In production, use your actual domain
  const baseUrl = window.location.origin;
  return `${baseUrl}/confirm-investment?token=${token}`;
}
