import { PreApprovalRequest } from "mercadopago/dist/clients/preApproval/commonTypes"
import { PlanPayload } from "~/services/checkout/metadata"

export const plans: Record<string, (username: string) => PreApprovalRequest> = {
  pro(username: string) {
    // return {
    //   reason: "Pro",
    //   external_reference: PlanPayload.serialize({ planName: "pro", username }),
    //   payer_email: "test_user_1534798027@testuser.com",
    //   auto_recurring: {
    //     frequency: 1,
    //     frequency_type: "months",
    //     transaction_amount: 30,
    //     currency_id: "BRL",
    //   },
    //   back_url: "https://hourboost-mp-test.ultrahook.com",
    //   status: "pending",
    // }
    return {
      reason: "Pro",
      auto_recurring: {
        frequency: 1,
        frequency_type: "months",
        start_date: "2024-05-01T10:00:00.000Z",
        end_date: "2026-05-01T10:00:00.000Z",
        transaction_amount: 10,
        currency_id: "BRL",
      },
      back_url: "https://hourboost-mp-test.ultrahook.com",
      external_reference: PlanPayload.serialize({ planName: "pro", username }),
      payer_email: "test_user_1534798027@testuser.com",
      status: "pending",
    }
  },
  ultra(username: string) {
    return {
      reason: "Ultra",
      external_reference: PlanPayload.serialize({
        planName: "ultra",
        username,
      }),
      payer_email: "test_user_1534798027@testuser.com",
      auto_recurring: {
        frequency: 1,
        frequency_type: "months",
        transaction_amount: 70,
        currency_id: "BRL",
      },
      back_url: "https://hourboost-mercadopago.ultrahook.com",
      status: "pending",
    }
  },
}
