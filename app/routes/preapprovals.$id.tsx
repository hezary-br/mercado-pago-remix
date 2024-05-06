import { LoaderFunctionArgs } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import { getPreapprovalData } from "~/services/checkout/get-preapproval"

export async function loader({ params }: LoaderFunctionArgs) {
  const preapprovalData = await getPreapprovalData({ id: params.id! })
  return preapprovalData
}

export default function Preapprovals() {
  const data = useLoaderData<typeof loader>()

  return <pre>{JSON.stringify({ data }, null, 2)}</pre>
}
