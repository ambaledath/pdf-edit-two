import React, { useEffect, useState } from "react";
import Annotator from "react-pdf-ner-annotator";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import "react-pdf-ner-annotator/lib/css/style.css";
import "./App.css";

const defaultAnnotations = [
  {
    id: 1,
    page: 1,
    nerAnnotation: { tokens: ["INV-3337"], textIds: [4] },
    entity: { id: 5, name: "Reference", color: "#DCE775", entityType: "NER" },
  },
  {
    id: 2,
    page: 1,
    nerAnnotation: { tokens: ["Test", "Business"], textIds: [44, 45] },
    entity: {
      id: 3,
      name: "Organisation",
      color: "#81C784",
      entityType: "NER",
    },
  },
];

const entities = [
  {
    id: 1,
    name: "Entity 1",
    color: "#4DD0E1",
    entityType: "NER",
  },
  {
    id: 2,
    name: "Entity 2",
    color: "#4DB6AC",
    entityType: "NER",
  },
];

function App() {
  const [annotations, setAnnotations] = useState(defaultAnnotations);
  const [selectedEntity, setSelectedEntity] = useState(-1);
  const [hoveredEntities, setHoveredEntities] = useState([]);

  useEffect(() => {
    console.log("annotations : ", annotations);
  }, [annotations]);

  const handleEnter = (entityId) => {
    setHoveredEntities((prev) => [...prev, { id: entityId }]);
  };

  const handleLeave = (entityId) => {
    setHoveredEntities((prev) =>
      [...prev].filter((entity) => entity.id !== entityId)
    );
  };

  return (
    <section>
      <h1>React PDF NER Annotator</h1>
      <div className="entities">
        <p>Select Entities</p>
        <ul className="entity-container">
          {entities.map((entity, index) => (
            <li
              key={entity.id}
              onMouseEnter={() => handleEnter(entity.id)}
              onMouseLeave={() => handleLeave(entity.id)}
            >
              <button
                className="entity-name"
                style={
                  selectedEntity === index || selectedEntity === -1
                    ? { backgroundColor: entity.color }
                    : { backgroundColor: "#bebebe" }
                }
                onClick={() =>
                  setSelectedEntity(selectedEntity !== index ? index : -1)
                }
              >
                {entity.name}
              </button>
            </li>
          ))}
          <li>
            <Popup
              trigger={<button className="show-all">show all</button>}
              modal
            >
              <div className="entity-popup">
                <h4>All Annotations</h4>
                {annotations.map((annotation) => {
                  return (
                    <div className="entity-name" key={annotation?.id}>
                      {annotation?.entity?.name} :{" "}
                      <span className="ner-annotation">
                        {annotation?.nerAnnotation?.tokens.join(", ")}
                      </span>
                    </div>
                  );
                })}
              </div>
            </Popup>
          </li>
        </ul>
      </div>
      <Annotator
        da
        url="./order.pdf"
        defaultAnnotations={defaultAnnotations}
        entity={entities[selectedEntity]}
        hoveredEntities={hoveredEntities}
        getAnnotations={setAnnotations}
        config={{
          shouldUpdateDefaultAnnotations: true,
        }}
      />
    </section>
  );
}

export default App;
