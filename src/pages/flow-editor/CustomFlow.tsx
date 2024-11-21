import React, { useCallback, useState } from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Panel,
  Position,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { Button, Card } from 'antd';

const minimapStyle = {
  height: 120,
  width: 160,
};

const initialNodes = [
  {
    id: '1',
    type: 'input',
    data: { label: 'Start' },
    position: { x: 250, y: 25 },
    style: {
      background: '#d5f5d5',
      border: '1px solid #85d685',
    },
    sourcePosition: Position.Right,
  },
];

const CustomFlow = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useNodesState([]);
  const [minimapPosition, setMinimapPosition] = useState({ x: 0, y: 0 });

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  const addNewNode = () => {
    const newNode = {
      id: `${nodes.length + 1}`,
      data: { label: `Task ${nodes.length + 1}` },
      position: {
        x: Math.random() * 500,
        y: Math.random() * 300,
      },
      style: {
        background: '#f5f5f5',
        border: '1px solid #d9d9d9',
      },
      sourcePosition: Position.Right,
      targetPosition: Position.Left,
    };
    setNodes((nds) => [...nds, newNode]);
  };

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
      >
        <Controls />
        <MiniMap 
          style={minimapStyle}
          position="top-right"
          pannable
          zoomable
        />
        <Background variant="dots" gap={12} size={1} />
        <Panel position="top-right" style={{ top: 140 }}>
          <Card size="small">
            <Button type="primary" onClick={addNewNode}>
              Add Node
            </Button>
          </Card>
        </Panel>
      </ReactFlow>
    </div>
  );
};

export default CustomFlow;
