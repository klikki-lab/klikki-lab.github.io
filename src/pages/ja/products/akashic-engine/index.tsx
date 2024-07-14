import React, { ReactElement } from 'react';
import { NextPageWithLayout } from '@/pages/_app';
import { Product } from '@/components/product/product'
import CommonLayout from '@/components/layout/commonLayout';
import { CommonFooter } from '@/components/footer/commonFooter';
import CommonHead from '@/components/head/commonHead';
import { TitleHeader } from '@/components/header/titleHeader';
import Link from 'next/link';

const PLATFORM = "akashic-engine";
type gameProps = {
    name: string;
    url: string;
};

const AkashicEngine: NextPageWithLayout = (): JSX.Element => {
    const games: gameProps[] = [
        { name: "ウイルスフリッパー", url: "virus-flipper" },
        { name: "メテオパニック", url: "meteor-panic" },
        { name: "デモンストレーション", url: "demonstration" },
        { name: "サクラヘヴン", url: "sakura-heaven" },
    ];
    return (
        <div className='row justify-content'>
            {games.map(game => {
                return (
                    <div className='col-auto' key={game.name}>
                        <Product
                            props={{
                                locale: 'ja',
                                platform: PLATFORM,
                                name: game.name,
                                url: game.url,
                                src: `/images/akashic-engine/${game.url}.png`
                            }} />
                    </div>
                )
            })}
        </div>
    )
};

AkashicEngine.getLayout = (page: ReactElement): JSX.Element => {
    const title = 'Akashic Engine';
    return (
        <>
            <CommonHead title={title} description={`${title} で制作したゲームの紹介。`} />

            <CommonLayout>
                <TitleHeader props={{
                    name: title,
                    src: '/images/akashic-engine/akashic_logo.png',
                    width: 150,
                    height: 107
                }} />

                <p>{title} の詳細は&nbsp;
                    <Link href={'https://akashic-games.github.io/'}>
                        https://akashic-games.github.io/
                    </Link>
                    &nbsp;をご覧ください。
                </p>

                {page}

            </CommonLayout>

            <CommonFooter />
        </>
    )
};

export default AkashicEngine;