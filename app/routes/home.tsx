import { redirect } from "react-router";

export let loader = async () => {
    return redirect("/todos/view/columns");
};

export default function Home() {
    return null;
}