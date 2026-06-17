"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Loader2, FlaskConical } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "sonner"

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(1, { message: "Password is required" }),
  rememberMe: z.boolean().default(false).optional(),
})

export default function LoginPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)

    try {
      const result = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
      })

      if (result?.error) {
        toast.error("Invalid credentials", {
          description: "Please check your email and password.",
        })
      } else {
        toast.success("Login successful!")
        router.push("/dashboard")
        router.refresh()
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col space-y-2 text-center lg:text-left">
        <div className="flex items-center justify-center lg:justify-start gap-2 mb-4 lg:hidden">
            <div className="bg-primary/10 p-2 rounded-md">
              <FlaskConical className="h-6 w-6 text-primary" />
            </div>
            <span className="font-bold text-xl">Chemtrack</span>
        </div>
        <h1 className="text-3xl font-semibold tracking-tight">Welcome Back</h1>
        <p className="text-sm text-muted-foreground">
          Enter your credentials to access your account
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
               <FormItem>
                <FormLabel className="text-foreground/80">Email Address</FormLabel>
                <FormControl>
                  <Input placeholder="name@company.com" {...field} disabled={isLoading} className="h-11 bg-background" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-foreground/80">Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="••••••••" {...field} disabled={isLoading} className="h-11 bg-background" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="flex items-center justify-between">
            <FormField
              control={form.control}
              name="rememberMe"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormLabel className="text-sm font-normal cursor-pointer text-muted-foreground leading-none">
                    Remember me
                  </FormLabel>
                </FormItem>
              )}
            />
            
            <Link 
              href="/forgot-password" 
              className="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
            >
              Forgot Password?
            </Link>
          </div>

          <Button type="submit" className="w-full h-11 text-base font-medium shadow-sm" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
            Log In
          </Button>
        </form>
      </Form>
      
      <div className="text-center text-sm text-muted-foreground pt-4 border-t border-border/50">
        Don't have an account?{" "}
        <Link href="/register" className="font-medium text-primary hover:text-primary/80 transition-colors">
          Request access
        </Link>
      </div>
      
      {/* Dev helper */}
      <div className="mt-8 p-4 bg-primary/5 rounded-md border border-primary/10 text-xs text-muted-foreground text-center">
        <strong>Demo accounts:</strong><br/>
        <code className="text-primary/80">superadmin@innonsh.com</code>, <code className="text-primary/80">admin@</code>, <code className="text-primary/80">manager@</code><br/>
        (Password: <code className="text-primary/80">password123</code>)
      </div>
    </div>
  )
}
