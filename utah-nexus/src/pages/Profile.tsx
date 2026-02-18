import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "lucide-react";
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

interface UserProfile {
  user_id: string;
  name: string | null;
  email: string | null;
  dob: string | null;
  county_id: number | null;
}

export function Profile() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dob, setDob] = useState("");
  const [county, setCounty] = useState("");
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const { user, isLoggedIn, isLoading: authLoading, refreshUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authLoading && !isLoggedIn) {
      navigate("/login", { replace: true });
      return;
    }
  }, [authLoading, isLoggedIn, navigate]);

  useEffect(() => {
    if (!user?.user_id) {
      setLoading(false);
      return;
    }

    const fetchProfile = async () => {
      const { data, error } = await supabase
        .from("User")
        .select("user_id, name, email, dob, county_id")
        .eq("user_id", user.user_id)
        .maybeSingle();

      if (error) {
        console.error("Failed to fetch profile:", error);
        setLoading(false);
        return;
      }

      const profile = data as UserProfile | null;
      if (profile) {
        setName(profile.name ?? "");
        setEmail(profile.email ?? "");
        setDob(profile.dob ?? "");
        if (profile.county_id) {
          const { data: countyData } = await supabase
            .from("county")
            .select("county_name")
            .eq("county_id", profile.county_id)
            .single();
          setCounty(countyData?.county_name ?? "");
        }
      }
      setLoading(false);
    };

    fetchProfile();
  }, [user?.user_id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.user_id) return;

    setSaving(true);

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

      const updates: Record<string, unknown> = {
        name: name || null,
        email: email || null,
        dob: dob || null,
        county_id: countyId,
        updated_at: new Date().toISOString(),
      };
      if (password) updates.password = password;

      const { data, error } = await supabase
        .from("User")
        .update(updates)
        .eq("user_id", user.user_id)
        .select()
        .single();

      if (error) throw error;

      await refreshUser();
      toast({
        title: "Profile saved",
        description: "Your changes have been saved successfully.",
      });

      if (data) {
        const profile = data as UserProfile;
        setName(profile.name ?? "");
        setEmail(profile.email ?? "");
        setDob(profile.dob ?? "");
      }
    } catch (err) {
      console.error("Failed to save profile:", err);
      toast({
        title: "Error",
        description: "Failed to save profile. Please try again.",
      });
    } finally {
      setSaving(false);
    }
  };

  if (authLoading || !isLoggedIn) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <p className="text-muted-foreground">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="flex justify-center">
      <Card className="w-full max-w-lg">
        <CardHeader className="flex flex-col items-center">
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-muted">
            <User className="h-12 w-12 text-muted-foreground" />
          </div>
          <h1 className="font-display font-semibold text-xl mt-4">Profile</h1>
          <p className="text-sm text-muted-foreground">
            {user?.name || user?.email || "Your account"}
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="mt-2"
              />
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
              />
            </div>
            <div>
              <Label htmlFor="password">New Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Leave blank to keep current"
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="dob">Date of Birth</Label>
              <Input
                id="dob"
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="county">Utah County</Label>
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
            <Button type="submit" className="w-full" disabled={saving}>
              {saving ? "Saving..." : "Save Changes"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
