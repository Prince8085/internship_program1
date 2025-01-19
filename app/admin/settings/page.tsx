"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { toast } from "@/hooks/use-toast"

export default function SettingsPage() {
  const [prices, setPrices] = useState({
    internshipFee: 5000,
    referralDiscount: 300,
    discountedFee: 2200,
  })

  useEffect(() => {
    fetchPrices()
  }, [])

  const fetchPrices = async () => {
    try {
      const response = await fetch('/api/admin/settings')
      const data = await response.json()
      setPrices(data)
    } catch (error) {
      console.error('Error fetching prices:', error)
      toast({
        title: "Error",
        description: "Failed to fetch pricing settings. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleSave = async () => {
    try {
      const response = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(prices),
      })

      if (!response.ok) {
        throw new Error('Failed to update settings')
      }

      toast({
        title: "Settings Updated",
        description: "The pricing settings have been updated successfully.",
      })
    } catch (error) {
      console.error('Error updating settings:', error)
      toast({
        title: "Error",
        description: "Failed to update pricing settings. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Settings</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Pricing Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="internshipFee">Regular Internship Fee (₹)</Label>
              <Input
                id="internshipFee"
                type="number"
                value={prices.internshipFee}
                onChange={(e) => setPrices({ ...prices, internshipFee: parseInt(e.target.value) })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="referralDiscount">Referral Discount (₹)</Label>
              <Input
                id="referralDiscount"
                type="number"
                value={prices.referralDiscount}
                onChange={(e) => setPrices({ ...prices, referralDiscount: parseInt(e.target.value) })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="discountedFee">Discounted Fee (₹)</Label>
              <Input
                id="discountedFee"
                type="number"
                value={prices.discountedFee}
                onChange={(e) => setPrices({ ...prices, discountedFee: parseInt(e.target.value) })}
              />
            </div>
          </div>
          <Button onClick={handleSave}>Save Changes</Button>
        </CardContent>
      </Card>
    </div>
  )
}

