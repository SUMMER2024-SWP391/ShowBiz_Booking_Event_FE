import { DownOutlined } from '@ant-design/icons'
import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Heading, Img, Text } from 'src/Components'
import Footer from 'src/Components/Footer/Footer'
import Header from 'src/Components/HeaderHomePage/HeaderHomePage'

export const EventOperatorHome = () => {
  return (
    <>
      <div className='w-full bg-gray-900 pb-[376px] md:pb-5'>
        <div className='flex flex-col items-center gap-14 sm:gap-7'>
          <div className='flex flex-col items-center self-stretch'>
            <Header className='bg-gradient' />
          </div>
          <div className='container-xs pl-[89px] pr-[70px] md:p-5 md:px-5'>
            <div className='flex flex-col gap-[73px] md:gap-[54px] sm:gap-9'>
              <div className='w-[96%] md:w-full'>
                <div className='flex flex-col'>
                  <div className='container-xs relative mt-[-3px] flex flex-col items-start pl-[174px] pr-[633px] md:p-5 md:px-5'>
                    <Heading size='4xl' as='h1'>
                      Event Operator
                    </Heading>
                  </div>
                  <div role='tablist' className='tabs tabs-bordered'>
                    <a
                      role='tab'
                      className='tab tab-active'
                      href='/eventoperator/Events'
                    >
                      Events
                    </a>
                    <a role='tab' className='tab '>
                      People
                    </a>
                    <a role='tab' className='tab'>
                      Newsletters
                    </a>
                    <a role='tab' className='tab'>
                      Insights
                    </a>
                    <a role='tab' className='tab'>
                      Setting
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  )
}
