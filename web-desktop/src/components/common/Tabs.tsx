import React, { useState } from 'react';
import type { RadioChangeEvent } from 'antd';
import { Radio, Space, Tabs } from 'antd';
import { AndroidOutlined, AppleOutlined } from '@ant-design/icons';

type TabPosition = 'left' | 'right' | 'top' | 'bottom';
type TabsProps = {

};
export const TabComp = (props: TabsProps) => {
    const [tabPosition, setTabPosition] = useState<TabPosition>('left');

    const changeTabPosition = (e: RadioChangeEvent) => {
        setTabPosition(e.target.value);
    };

    return (
        <>

            <Tabs
                tabPosition={tabPosition}
                style={{ height: '100%' }}
                items={[{
                    label: `Excursion Price Search`,
                    key: "1",
                    children: `Content of Tab 1`,
                    icon: <AndroidOutlined />
                },
                {
                    label: `Contracts`,
                    key: "2",
                    children: `Content of Tab 2`,
                    icon: <AppleOutlined />

                }
                ]}
            />
        </>
    );
};
