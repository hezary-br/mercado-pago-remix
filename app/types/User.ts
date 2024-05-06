import { PlanInfo } from "~/types/PlanInfo"

export type UserType = {
  username: string
  planInfo: null | (PlanInfo & { name: string })
}
