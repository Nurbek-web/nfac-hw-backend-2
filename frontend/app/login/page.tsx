"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useAuth } from "@/context/AuthContext";

function LoginForm(): JSX.Element {
  const { login, isAuthenticated } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/");
    }
  }, []);

  const handleForm = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    setAlert(false);

    try {
      await login(email, password);
    } catch (error) {
      setAlert(true);
      console.error("Failed to login :(", error);
    }

    //     const { result, error } = await signIn(email, password);

    //     if (error) {
    //       console.log(error);
    //       setAlert(true);
    //       return;
    //     }

    //     console.log(result);

    //     router.push("/");
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleForm}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  onChange={(e) => setEmail(e.target.value)}
                  id="email"
                  type="email"
                  placeholder="example@gmail.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>

                <Input
                  id="password"
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  placeholder="Sanzhar2005"
                  required
                />
              </div>
              {alert ? (
                <Alert variant="destructive">
                  {/* <AlertCircle className="h-4 w-4" /> */}
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>
                    Incorrect password or email. please try again
                  </AlertDescription>
                </Alert>
              ) : (
                <></>
              )}

              <Button type="submit" className="w-full">
                Login
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default LoginForm;
