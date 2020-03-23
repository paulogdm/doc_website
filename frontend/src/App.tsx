import React, { useState, useEffect } from "react";
import { DocNode, getDocs } from "./util/docs";
import { NodesProvider } from "./util/nodes";
import { NamespaceRoute } from "./routes/namespace";
import { PrefixProvider } from "./util/prefix";
import { Switch, Route } from "react-router-dom";
import { SinglePageRoute } from "./routes/singlepage";

function App() {
  const [nodes, setNodes] = useState<DocNode[] | null>(null);

  useEffect(() => {
    getDocs().then(setNodes);
  }, []);

  return nodes ? (
    <Switch>
      <Route path="/singlepage" render={() => <SinglePageRoute nodes={nodes}/>} />
      <Route
        render={() => (
          <NodesProvider value={nodes}>
            <PrefixProvider value={{ namespace: "", node: "" }}>
              <NamespaceRoute name="" />
            </PrefixProvider>
          </NodesProvider>
        )}
      />
    </Switch>
  ) : (
    <div className="h-full flex justify-center items-center">
      <div className="text-gray-800 text-2xl">Loading...</div>
    </div>
  );
}

export default App;