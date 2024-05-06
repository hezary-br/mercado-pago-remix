import { preApproval } from "~/infra/services/mercadopago"
import { plans } from "~/services/plans"

type CreateCheckoutProps = {
  plan: string
  username: string
}

type CreateCheckoutReturn = {
  checkoutUrl: string
}

export async function createCheckout({
  plan,
  username,
}: CreateCheckoutProps): Promise<CreateCheckoutReturn> {
  const makePlanBody = plans[plan]
  if (!makePlanBody) throw makePlanBody
  const body = makePlanBody(username)

  try {
    const response = await preApproval.create({
      body,
    })
    return {
      checkoutUrl: response.init_point as string,
    }
  } catch (error) {
    console.log({ error })
    return {
      checkoutUrl: "?checkout=fail",
    }
  }
}
