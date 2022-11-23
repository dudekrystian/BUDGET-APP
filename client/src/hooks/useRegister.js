export default function useRegister() {
  const register = async (email, password) => {
    const response = await fetch("/api/user/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const json = await response.json();

    if (!response.ok) {
      //
    }
    if (response.ok) {
      //
    }
  };

  return { register };
}
