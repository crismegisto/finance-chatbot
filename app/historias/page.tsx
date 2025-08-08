"use client"
import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function HistoriasPage() {
  const [markdown, setMarkdown] = useState("");
  const router = useRouter();

  useEffect(() => {
    fetch("/user-stories.md")
      .then((res) => res.text())
      .then(setMarkdown);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <Card className="max-w-2xl w-full">
        <CardHeader>
          <CardTitle>Historias de Usuario</CardTitle>
        </CardHeader>
        <CardContent>
          <ReactMarkdown>{markdown}</ReactMarkdown>
          <div className="mt-6 flex justify-end">
            <Button variant="outline" onClick={() => router.back()}>
              Volver
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
