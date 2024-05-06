import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node"
import { preApproval } from "~/infra/services/mercadopago"
import { PlanPayload } from "~/services/checkout/metadata"
import { usersRepository } from "~/services/database/users"

export async function loader({ params, request }: LoaderFunctionArgs) {
  const { searchParams } = new URL(request.url)
  console.log({ params, query: searchParams })

  return new Response(null, {
    status: 200,
  })
}

export async function action({ request }: ActionFunctionArgs) {
  const { action, type, data } = await request.json()
  if (action !== "updated") console.log({ action })

  switch (action) {
    case "payment.created":
    case "created":
    case "updated":
      if (type !== "subscription_preapproval") console.log({ type })
      switch (type) {
        case "subscription_preapproval":
          console.log("Uma assinatura foi criada, processando...")
          const found = await preApproval.get({
            id: data.id,
          })
          if (!("external_reference" in found)) console.log({ found })
          const { username, planName } = PlanPayload.parse(
            found.external_reference!
          )
          console.log(username, planName)
          const user = await usersRepository.get(username)
          user.changePlan(planName, found)
          await usersRepository.save(user)
          console.log("Updated user's plan.")
        case "subscription_authorized_payment":
          console.log("Parcela da assinatura paga!", request.body)
      }
    default:
      console.log({ action, type })
  }

  return new Response(null, {
    status: 200,
  })
}
