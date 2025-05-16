import SurveyWrapper from "../components/SurveyWrapper";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <main className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <Suspense fallback={<div>Loading...</div>}>
        <SurveyWrapper />
      </Suspense>
    </main>
  );
}
