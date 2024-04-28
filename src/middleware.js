import { verify } from "jsonwebtoken";
import { NextResponse } from "next/server";



export default async function middleware(req) {
  const { headers } = req;
console.log(process.env.NEXT_API)
  const jwt = headers.get("cookie")?.split("=")[1];
  const url = req.url;
  if (url.includes("/login")) {
    if (jwt) {
      try {
        const response = await fetch(`${process.env.NEXT_API}/api/auth/logout`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ jwt }),
        });
        const to = await response.json();
        return NextResponse.redirect(`${process.env.NEXT_API}/dashboard`);
      } catch (e) {
        return NextResponse.redirect(`${process.env.NEXT_API}/login`);
      }
    }
  } 
  if (url.includes("/dashboard")) {
    if (jwt === "" || jwt === undefined) {
      return NextResponse.redirect(`${process.env.NEXT_API}/login`);
    }
    try {
      const response = await fetch(`${process.env.NEXT_API}/api/auth/logout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jwt }),
      });
      const to = await response.json();
      if (to.message) {
        return NextResponse.next();
      } else {
        return NextResponse.redirect(`${process.env.NEXT_API}/login`);
      }
    } catch (e) {
      return NextResponse.redirect(`${process.env.NEXT_API}/login`);
    }
  }
}
