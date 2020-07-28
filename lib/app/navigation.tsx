import React from "react";
import history from "./history";
import { getStoryTree } from "./story-name";
import type { StoryTreeT } from "../types";

const Link: React.FC<{ href: string; children: React.ReactNode }> = ({
  href,
  children,
}) => (
  <a
    href={href}
    onClick={(e) => {
      e.preventDefault();
      history.push(href);
    }}
  >
    {children}
  </a>
);

const Navigation: React.FC<{ stories: string[] }> = ({ stories }) => (
  <aside className="fstbk-aside">
    <ul>
      <NavigationSection tree={getStoryTree(stories)} />
    </ul>
  </aside>
);

const NavigationSection: React.FC<{
  tree: StoryTreeT;
}> = ({ tree }) => {
  return (
    <React.Fragment>
      {Object.keys(tree)
        .sort()
        .map((key) => {
          const treeProps = tree[key];
          return (
            <li
              key={key}
              className={treeProps.isLinkable ? "fstbk-linkable" : ""}
              style={!treeProps.isLinkable ? { marginTop: "0.5em" } : {}}
            >
              {treeProps.isLinkable ? (
                <Link href={`?story=${treeProps.id}`}>{treeProps.name}</Link>
              ) : (
                treeProps.name
              )}
              {Object.keys(treeProps.children).length > 0 && (
                <ul>
                  <NavigationSection tree={treeProps.children} />
                </ul>
              )}
            </li>
          );
        })}
    </React.Fragment>
  );
};

export default Navigation;
