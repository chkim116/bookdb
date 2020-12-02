import React from "react";
import Link from "next/link";
import { BestSeller } from "../../pages";
import { Button } from "../../styles/CommonStyle";

const MainPage = ({ list }: any) => {
    return (
        <div>
            {list.map((v: BestSeller) => (
                <div key={v.id}>
                    <div>{v.title}</div>
                    <div>{v.auth}</div>
                    <div>{v.summary}</div>
                    <div>
                        <img src={v.imageUrl} alt={v.imageAlt} />
                    </div>
                    <Link href={v.url}>
                        <a target="blank">
                            <Button>더보기</Button>
                        </a>
                    </Link>
                </div>
            ))}
        </div>
    );
};

export default MainPage;
