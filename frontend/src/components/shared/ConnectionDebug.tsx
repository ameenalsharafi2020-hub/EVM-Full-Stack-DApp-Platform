'use client';

import { useEffect, useState } from 'react';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { walletConnectProjectId } from '@/config/wagmi';

export function ConnectionDebug() {
  const { address, isConnected, connector } = useAccount();
  const { connectors } = useConnect();
  const [show, setShow] = useState(false);

  if (process.env.NODE_ENV !== 'development') return null;

  return (
    <>
      <button
        onClick={() => setShow(!show)}
        className="fixed bottom-4 right-4 z-50 rounded-full bg-blue-600 p-3 text-white shadow-lg hover:bg-blue-700"
        title="Debug Info"
      >
        🔧
      </button>

      {show && (
        <div className="fixed bottom-16 right-4 z-50 max-w-md rounded-lg bg-gray-900 p-4 text-xs text-white shadow-2xl">
          <div className="mb-2 flex items-center justify-between">
            <h3 className="font-bold">Connection Debug</h3>
            <button onClick={() => setShow(false)} className="text-gray-400 hover:text-white">
              ✕
            </button>
          </div>
          
          <div className="space-y-2">
            <div>
              <span className="text-gray-400">Status:</span>{' '}
              <span className={isConnected ? 'text-green-400' : 'text-red-400'}>
                {isConnected ? '✅ Connected' : '❌ Disconnected'}
              </span>
            </div>
            
            {address && (
              <div>
                <span className="text-gray-400">Address:</span>{' '}
                <code className="text-green-400">{address.slice(0, 10)}...</code>
              </div>
            )}
            
            {connector && (
              <div>
                <span className="text-gray-400">Connector:</span>{' '}
                <span className="text-blue-400">{connector.name}</span>
              </div>
            )}
            
            <div>
              <span className="text-gray-400">Project ID:</span>{' '}
              <code className="text-yellow-400">{walletConnectProjectId.slice(0, 8)}...</code>
            </div>
            
            <div>
              <span className="text-gray-400">Available Connectors:</span>
              <div className="ml-2 mt-1 space-y-1">
                {connectors.map((conn) => (
                  <div key={conn.id} className="text-gray-300">
                    • {conn.name}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}