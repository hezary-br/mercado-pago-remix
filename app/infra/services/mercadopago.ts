import { MercadoPagoConfig, PreApproval } from "mercadopago"

const client = new MercadoPagoConfig({
  accessToken: process.env.ACCESS_TOKEN as string,
})

console.log(process.env.ACCESS_TOKEN as string)

export const preApproval = new PreApproval(client)
