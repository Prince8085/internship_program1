"use client"

import { useState, useEffect } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { toast } from "@/hooks/use-toast"

export function ReferralManager() {
  const [referralNames, setReferralNames] = useState<string[]>([])
  const [newName, setNewName] = useState('')

  useEffect(() => {
    fetchReferralNames()
  }, [])

  const fetchReferralNames = async () => {
    try {
      const response = await fetch('/api/admin/referrals')
      const data = await response.json()
      setReferralNames(data.referralNames)
    } catch (error) {
      console.error('Error fetching referral names:', error)
      toast({
        title: "Error",
        description: "Failed to fetch referral names. Please try again.",
        variant: "destructive",
      })
    }
  }

  const addReferralName = async () => {
    if (newName.trim()) {
      try {
        const response = await fetch('/api/admin/referrals', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: newName.trim() })
        })
        
        if (!response.ok) {
          throw new Error('Failed to add referral name')
        }

        await fetchReferralNames()
        setNewName('')
        toast({
          title: "Referral Name Added",
          description: `${newName.trim()} has been added to the referral list.`,
        })
      } catch (error) {
        console.error('Error adding referral name:', error)
        toast({
          title: "Error",
          description: "Failed to add referral name. Please try again.",
          variant: "destructive",
        })
      }
    }
  }

  const removeReferralName = async (name: string) => {
    try {
      const response = await fetch(`/api/admin/referrals/${encodeURIComponent(name)}`, {
        method: 'DELETE'
      })
      
      if (!response.ok) {
        throw new Error('Failed to remove referral name')
      }

      await fetchReferralNames()
      toast({
        title: "Referral Name Removed",
        description: `${name} has been removed from the referral list.`,
      })
    } catch (error) {
      console.error('Error removing referral name:', error)
      toast({
        title: "Error",
        description: "Failed to remove referral name. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex space-x-2">
        <Input
          type="text"
          placeholder="Enter new referral name"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />
        <Button onClick={addReferralName}>Add</Button>
      </div>
      <ul className="space-y-2">
        {referralNames.map((name) => (
          <li key={name} className="flex justify-between items-center">
            <span>{name}</span>
            <Button variant="destructive" size="sm" onClick={() => removeReferralName(name)}>
              Remove
            </Button>
          </li>
        ))}
      </ul>
    </div>
  )
}

