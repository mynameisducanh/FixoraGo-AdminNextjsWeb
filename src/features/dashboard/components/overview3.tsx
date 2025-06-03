'use client'

import { useEffect, useState } from 'react'
import { TrendingUp } from 'lucide-react'
import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from 'recharts'
import ReviewApi from '@/api/reviewApi'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'

export const description = 'A bar chart with a custom label'



const chartConfig = {
  totalReview: {
    label: 'Total Review',
    color: 'var(--chart-2)',
  },
  mobile: {
    label: 'Mobile',
    color: 'var(--chart-2)',
  },
  label: {
    color: 'var(--background)',
  },
} satisfies ChartConfig

interface MonthlyStats {
    fiveStar: number,
    fourStar: number,
    threeStar: number,
    twoStar: number,
    oneStar: number
}
export function ChartBarLabelCustom() {
  const reviewApi = new ReviewApi()
  const [monthlyStats, setMonthlyStats] = useState<MonthlyStats>()
  const fetchData = async () => {
    try {
      const res = await reviewApi.getTotalReview()
      console.log(res)
      if(res){
        setMonthlyStats(res.ratingStats);
      }
    } catch (error) {
      console.log(error)
    }
  }
  const chartData = [
    { month: '5 ★', totalReview: monthlyStats?.fiveStar},
    { month: '4 ★', totalReview: monthlyStats?.fourStar },
    { month: '3 ★', totalReview: monthlyStats?.threeStar },
    { month: '2 ★', totalReview: monthlyStats?.twoStar },
    { month: '1 ★', totalReview: monthlyStats?.oneStar },
  ]
  useEffect(() => {
    fetchData()
  }, [])
  return (
    <Card>
      <CardHeader>
        <CardTitle>Bar Chart - Custom Label</CardTitle>
        {/* <CardDescription>January - June 2024</CardDescription> */}
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            layout='vertical'
            margin={{
              right: 16,
            }}
          >
            <CartesianGrid horizontal={false} />
            <YAxis
              dataKey='month'
              type='category'
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
              hide
            />
            <XAxis dataKey='totalReview' type='number' hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator='line' />}
            />
            <Bar
              dataKey='totalReview'
              layout='vertical'
              fill='var(--color-desktop)'
              radius={4}
            >
              <LabelList
                dataKey='month'
                position='insideLeft'
                offset={8}
                className='fill-(--color-label)'
                fontSize={12}
              />
              <LabelList
                dataKey='totalReview'
                position='right'
                offset={8}
                className='fill-foreground'
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      {/* <CardFooter className='flex-col items-start gap-2 text-sm'>
        <div className='flex gap-2 leading-none font-medium'>
          Trending up by 5.2% this month <TrendingUp className='h-4 w-4' />
        </div>
        <div className='text-muted-foreground leading-none'>
          Showing total visitors for the last 6 months
        </div>
      </CardFooter> */}
    </Card>
  )
}
