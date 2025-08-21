interface TransactionalEmailParams {
  email: string;
  firstname: string;
  lastname: string;
  [key: string]: any; // Pour permettre d'autres paramètres dynamiques
}

interface TransactionalEmailRequest {
  templateId: number;
  params: TransactionalEmailParams;
}

export const sendTransactionnal = async ({ templateId, params }: TransactionalEmailRequest) => { 
    const body = {
      templateId,
      params,
      to: [{
        email: params.email,
        name: `${params.firstname} ${params.lastname}`
      }]
    }
    const res = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'api-key': process.env.BREVO_API_KEY || ''
      },
      body: JSON.stringify(body)
    })
    const json = await res.json()
    return json
  }
  