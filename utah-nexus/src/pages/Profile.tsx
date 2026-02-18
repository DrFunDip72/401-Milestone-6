import { useState, useEffect } from "react";
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
import { useAnonymousAuth } from "@/hooks/useAnonymousAuth";
import { UTAH_COUNTIES } from "@/data/mockData";
import { supabase } from "@/lib/supabase";

interface UserProfile {
  User_ID: string;
  Name: string | null;
  Email: string | null;
  DOB: string | null;
  County_ID: number | null;
}

export function Profile() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dob, setDob] = useState("");
  const [county, setCounty] = useState("");
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();
  const { user, loading: authLoading } = useAnonymousAuth();

  useEffect(() => {
    if (!user?.id) return;

    const fetchProfile = async () => {
      const { data, error } = await supabase
        .from("User")
        .select("User_ID, Name, Email, DOB, County_ID")
        .eq("User_ID", user.id)
        .maybeSingle();

      if (error) {
        console.error("Failed to fetch profile:", error);
        return;
      }

      const profile = data as UserProfile | null;
      if (profile) {
        setName(profile.Name ?? "");
        setEmail(profile.Email ?? "");
        setDob(profile.DOB ?? "");
        if (profile.County_ID) {
          const { data: countyData } = await supabase
            .from("County")
            .select("County_Name")
            .eq("County_ID", profile.County_ID)
            .single();
          setCounty(countyData?.County_Name ?? "");
        }
      }
    };

    fetchProfile();
  }, [user?.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.id) {
      toast({
        title: "Error",
        description: "Please wait for authentication to complete.",
      });
      return;
    }

    setSaving(true);

    try {
      let countyId: number | null = null;
      if (county) {
        const { data: countyData } = await supabase
          .from("County")
          .select("County_ID")
          .eq("County_Name", county)
          .maybeSingle();
        countyId = countyData?.County_ID ?? null;
      }

      const { data, error } = await supabase
        .from("User")
        .upsert(
          {
            User_ID: user.id,
            Name: name || null,
            Email: email || null,
            DOB: dob || null,
            County_ID: countyId,
            updated_at: new Date().toISOString(),
          },
          { onConflict: "User_ID" }
        )
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Profile saved",
        description: "Your changes have been saved successfully.",
      });

      if (data) {
        const profile = data as UserProfile;
        setName(profile.Name ?? "");
        setEmail(profile.Email ?? "");
        setDob(profile.DOB ?? "");
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

  if (authLoading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <p className="text-muted-foreground">Loading...</p>
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
                placeholder="••••••••"
                className="mt-2"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Password change not yet implemented. Field kept for future auth.
              </p>
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
