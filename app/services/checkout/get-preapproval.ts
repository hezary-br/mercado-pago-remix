import { preApproval } from "~/infra/services/mercadopago"
import { PlanInfo } from "~/types/PlanInfo"

type GetPreapprovalDataProps = {
  id: string
}

type GetPreapprovalDataReturn =
  | {
      error: true
      info: unknown
    }
  | {
      error: false
      plan: PlanInfo
    }

export async function getPreapprovalData({
  id,
}: GetPreapprovalDataProps): Promise<GetPreapprovalDataReturn> {
  try {
    const foundPlan = await preApproval.get({
      id,
    })

    return { error: false, plan: foundPlan }
  } catch (error) {
    console.log({ error })
    return { error: true, info: error }
  }
}
