"use client"

import { Line, LineChart, ResponsiveContainer, Tooltip } from "recharts"

interface OverviewProps {
  data: any[]
}

export function Overview({ data }: OverviewProps) {
  // Group applications by month
  const monthlyData = data.reduce((acc: any[], app: any) => {
    const date = new Date(app.appliedDate)
    const month = date.toLocaleString('default', { month: 'short' })
    
    const existingMonth = acc.find(item => item.name === month)
    if (existingMonth) {
      existingMonth.total++
    } else {
      acc.push({ name: month, total: 1 })
    }
    
    return acc
  }, [])

  // Sort by month
  monthlyData.sort((a, b) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    return months.indexOf(a.name) - months.indexOf(b.name)
  })

  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={monthlyData}>
        <Tooltip />
        <Line
          type="monotone"
          dataKey="total"
          stroke="hsl(var(--primary))"
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}

