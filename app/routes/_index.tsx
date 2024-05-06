import type { ActionFunctionArgs, MetaFunction } from "@remix-run/node"
import {
  Form,
  Link,
  redirect,
  useActionData,
  useLoaderData,
} from "@remix-run/react"
import { createCheckout } from "~/services/checkout/create"
import { usersRepository } from "~/services/database/users"

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ]
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData()
  const plan = formData.get("plan") as string
  const username = formData.get("username") as string
  try {
    await usersRepository.get(username)
  } catch (error) {
    return { error: "No user with this username." }
  }

  const { checkoutUrl } = await createCheckout({ username, plan })

  return redirect(checkoutUrl)
}

export async function loader() {
  const users = await usersRepository.list()
  return { users: users.map(u => u.toJSON()) }
}

export default function Index() {
  const { users } = useLoaderData<typeof loader>()
  const actionData = useActionData<typeof action>()

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      {actionData?.error && (
        <p className="w-fit rounded bg-red-200 p-0.5 font-semibold text-red-600">
          {actionData.error}
        </p>
      )}
      <div className="flex gap-8">
        <div className="w-fit p-10">
          <Form
            method="post"
            className="flex w-fit flex-col gap-2"
          >
            <input
              className="h-9 rounded border border-neutral-300 px-4 text-sm shadow transition-[background-color] duration-200 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-1 focus:ring-offset-white"
              type="text"
              placeholder="username"
              name="username"
            />
            <button
              type="submit"
              className="h-9 rounded bg-yellow-500 px-4 text-sm text-white shadow transition-[background-color] duration-200 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-700 focus:ring-offset-1 focus:ring-offset-white"
              name="plan"
              value="pro"
            >
              Plano Pro
            </button>
            <button
              type="submit"
              className="h-9 rounded bg-indigo-700 px-4 text-sm text-white shadow transition-[background-color] duration-200 hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-indigo-800 focus:ring-offset-1 focus:ring-offset-white"
              name="plan"
              value="ultra"
            >
              Plano Ultra
            </button>
          </Form>
        </div>
        <section className="grow">
          <h2>Users</h2>
          <div className="flex w-full max-w-md flex-col gap-4">
            {users.map(user => (
              <div
                key={user.username}
                className="flex gap-2 rounded-lg bg-zinc-100 p-4"
              >
                <span>{user.username}</span>
                <div className="ml-auto ">
                  {user.planInfo ? (
                    <Link
                      to={`/preapprovals/${user.planInfo.id}`}
                      className="block flex h-9 items-center rounded bg-yellow-500 px-4 text-sm text-white shadow transition-[background-color] duration-200 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-700 focus:ring-offset-1 focus:ring-offset-white"
                    >
                      {user.planInfo.name}
                    </Link>
                  ) : (
                    <div className="flex h-9 items-center rounded bg-zinc-300 px-4 text-sm text-black shadow transition-[background-color] duration-200 hover:bg-zinc-400 focus:outline-none">
                      No plan
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
