'use client'

import { useState, useEffect } from 'react'
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts'
import RevenueManagerApi from '@/api/revenueManagerApi'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'

const chartConfig = {
  monthlyRevenue: {
    label: 'Monthly Revenue',
    color: '#2563eb',
  },
  monthlyFees: {
    label: 'Monthly Fees',
    color: '#60a5fa',
  },
} satisfies ChartConfig

export function Overview() {
  const revenueManagerApi = new RevenueManagerApi()
  const [yearlyTotalRevenue, setYearlyTotalRevenue] = useState()
  const [yearlyTotalFees, setYearlyTotalFees] = useState()
  const [monthlyStats, setMonthlyStats] = useState([])
  const [monthlyFees, setMonthlyFees] = useState([])
  const fetchData = async () => {
    try {
      const res = await revenueManagerApi.getForYear('2025')
      console.log(res)
      if (res) {
        setMonthlyStats(res.monthlyStats)
      }
    } catch (error) {
      console.log(error)
    }
  }
  
  useEffect(() => {
    fetchData()
  }, [])

  return (
    <ChartContainer config={chartConfig} className='min-h-[200px] w-full'>
      <BarChart accessibilityLayer data={monthlyStats}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey='month'
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey='monthlyRevenue' fill='var(--color-desktop)' radius={4} />
        <Bar dataKey='monthlyFees' fill='var(--color-mobile)' radius={4} />
      </BarChart>
    </ChartContainer>
  )
}
