import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import Head from "next/head";

type Props = {
    aid: string;
};

export const getServerSideProps = async (
    context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<Props>> => {
    if (typeof context.params?.aid === "string") {
        return {
            props: {
                aid: context.params?.aid,
            },
        };
    } else {
        return {
            notFound: true,
        };
    }
};

const Page = ({ aid }: Props) => {
    const router = useRouter();

    useEffect(() => {
        router.push(`/?aid=${aid}`);
    }, []);
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "";
    return (
        <>
            <Head>
                <meta property="og:url" content={`${baseUrl}`} />
                <meta property="og:site_name" content="てすとにょ" />
                <meta property="og:locate" content="ja_JP" />
                <meta
                    property="og:image"
                    key="ogImage"
                    content={`${baseUrl}/api/ogp?aid=${aid}`}
                />
                <meta
                    name="twitter:card"
                    key="twitterCard"
                    content="summary_large_image"
                />
                <meta name="twitter:title" content="てすとにょ２" />
                <meta name="twitter:description" content="description" />
                <meta
                    name="twitter:image"
                    key="twitterImage"
                    content={`${baseUrl}/api/ogp?aid=${aid}`}
                />
            </Head>
            <div>
                このページはすぐにリダイレクトされます。リダイレクトされない場合は
                <a href={`/?aid=${aid}`}>こちら</a>をクリックしてください。
            </div>
        </>
    );
};
export default Page;
