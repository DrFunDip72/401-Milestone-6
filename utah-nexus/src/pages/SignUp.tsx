import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/useToast";
import { useAuth } from "@/contexts/AuthContext";
import { UTAH_COUNTIES } from "@/data/mockData";
import { supabase } from "@/lib/supabase";

export function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [county, setCounty] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      let countyId: number | null = null;
      if (county) {
        const { data: countyData } = await supabase
          .from("county")
          .select("county_id")
          .eq("county_name", county)
          .maybeSingle();
        countyId = countyData?.county_id ?? null;
      }

      const userId = crypto.randomUUID();
      const name = [firstName.trim(), surname.trim()].filter(Boolean).join(" ") || null;

      const { error } = await supabase.from("User").insert({
        user_id: userId,
        name,
        email: email.trim() || null,
        password: password || null,
        county_id: countyId,
      });

      if (error) throw error;

      login(userId);
      toast({
        title: "Account created",
        description: "Welcome to Utah Nexus!",
      });
      navigate("/profile");
    } catch (err) {
      console.error("Sign up failed:", err);
      toast({
        title: "Error",
        description: "Failed to create account. Please try again.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center">
      <Card className="w-full max-w-lg">
        <CardHeader className="text-center">
          <h1 className="font-display font-semibold text-xl">
            Create Account
          </h1>
          <p className="text-sm text-muted-foreground">
            Join Utah Nexus for balanced local news
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="First name"
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="surname">Surname</Label>
                <Input
                  id="surname"
                  value={surname}
                  onChange={(e) => setSurname(e.target.value)}
                  placeholder="Surname"
                  className="mt-2"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="mt-2"
                required
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="mt-2"
                required
              />
            </div>
            <div>
              <Label htmlFor="county">County</Label>
              <Select value={county} onValueChange={setCounty}>
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Select county" />
                </SelectTrigger>
                <SelectContent>
                  {UTAH_COUNTIES.map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button type="submit" className="w-full" disabled={submitting}>
              {submitting ? "Creating account..." : "Sign Up"}
            </Button>
            <p className="text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link to="/login" className="text-primary hover:underline">
                Login
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
