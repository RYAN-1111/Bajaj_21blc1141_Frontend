import Head from "next/head";
import InputForm from "../components/InputForm";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <Head>
        <title>21BCE1845</title>
      </Head>
      <InputForm />
    </div>
  );
}
