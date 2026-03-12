import React from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RefreshCcw } from "lucide-react";

const Swap: React.FC = () => {
  return (
    <Card className="p-6 bg-black/80 border-green-500/50 shadow-lg shadow-green-500/20 backdrop-blur-sm">
      <h2 className="text-2xl font-bold text-green-400 mb-4">Token Swap</h2>
      <div className="grid gap-4">
        <div>
          <label htmlFor="fromToken" className="block text-sm font-medium text-green-400 mb-1">From</label>
          <div className="flex gap-2">
            <Input id="fromToken" type="number" placeholder="0.0" className="bg-black/60 border-green-500/30 text-green-400" />
            <Select>
              <SelectTrigger className="w-[180px] bg-black/60 border-green-500/30 text-green-400">
                <SelectValue placeholder="Select token" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="eth">ETH</SelectItem>
                <SelectItem value="amapa">AMAPA</SelectItem>
                <SelectItem value="usdt">USDT</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex justify-center">
          <Button variant="ghost" size="sm" className="text-green-400">
            <RefreshCcw className="h-4 w-4" />
          </Button>
        </div>
        <div>
          <label htmlFor="toToken" className="block text-sm font-medium text-green-400 mb-1">To</label>
          <div className="flex gap-2">
            <Input id="toToken" type="number" placeholder="0.0" className="bg-black/60 border-green-500/30 text-green-400" />
            <Select>
              <SelectTrigger className="w-[180px] bg-black/60 border-green-500/30 text-green-400">
                <SelectValue placeholder="Select token" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="eth">ETH</SelectItem>
                <SelectItem value="amapa">AMAPA</SelectItem>
                <SelectItem value="usdt">USDT</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <Button className="w-full bg-green-500/20 text-green-400 hover:bg-green-500/40">
          Swap Tokenssss
        </Button>
      </div>
    </Card>
  );
};

export default Swap;