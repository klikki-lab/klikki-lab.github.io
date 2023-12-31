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
        { name: "Virus Flipper", url: "virus-flipper" },
        { name: "Meteor Panic", url: "meteor-panic" },
        { name: "Demonstration", url: "demonstration" },
    ];
    return (
        <div className='row justify-content'>
            {games.map(game => {
                return (
                    <div className='col-auto' key={game.name}>
                        <Product
                            props={{
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
            <CommonHead title={title} description={`Games made with ${title}.`} />

            <CommonLayout>
                <TitleHeader props={{
                    name: title,
                    src: '/images/akashic-engine/akashic_logo.png',
                    width: 150,
                    height: 107
                }} />

                <p>Please refer to&nbsp;
                    <Link href={'https://akashic-games.github.io/'}>
                        https://akashic-games.github.io/
                    </Link>
                    &nbsp;for details on the {title}.
                </p>

                {page}
            </CommonLayout>

            <CommonFooter />
        </>
    )
};

export default AkashicEngine;