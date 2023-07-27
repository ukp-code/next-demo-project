"use client"
import React, { useEffect, useState } from 'react'
import styles from './page.module.css'
import Link from 'next/link'
import { signIn, useSession } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'

const Login = () => {
    const session = useSession()
    const router = useRouter()
    const params = useSearchParams()
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")

    useEffect(() => {
        setError(params.get("error"))
        setSuccess(params.get("success"))
        console.log(session.status);
    }, [params])


    if (session.status == 'authenticate') {
        router?.push("/dashboard")
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const email = e.target[0].value
        const password = e.target[1].value

        signIn("credentials", {
            email,
            password
        })
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>{success ? success : "Welcome Back"}</h1>
            <h2 className={styles.subtitle}>Please sign in to see the dashboard.</h2>

            <form onSubmit={handleSubmit} className={styles.form}>
                <input
                    type="text"
                    placeholder="Email"
                    required
                    className={styles.input}
                />
                <input
                    type="password"
                    placeholder="Password"
                    required
                    className={styles.input}
                />
                <button className={styles.button}>Login</button>
                {error && error}
            </form>
            <div style={{display:'flex'}}>
                <button
                    onClick={() => {
                        signIn("google");
                    }}
                    className={styles.button + " " + styles.google}
                    style={{width:'150px'}}
                >
                    Google
                </button>
                <button
                    onClick={() => {
                        signIn("github");
                    }}
                    className={styles.button + " " + styles.github}
                    style={{width:'150px'}}
                >
                    Github
                </button>
            </div>
            <span className={styles.or}>- OR -</span>
            <Link className={styles.link} href="/dashboard/register">
                Create new account
            </Link>
        </div>
    )
}

export default Login