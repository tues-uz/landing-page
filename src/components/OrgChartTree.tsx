import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import type { OrgChartTreeNode } from "@/config/organizationalStructureOrgChartTree";

function OrgChartNodeLink({ node }: { node: OrgChartTreeNode }) {
  const className = cn("org_item title", node.to && "hover:text-primary");

  const content = (
    <>
      {node.isParent ? <i className="oci oci-menu parentNodeSymbol" aria-hidden /> : null}
      {node.label}
    </>
  );

  if (node.to) {
    return (
      <Link to={node.to} className={className}>
        {content}
      </Link>
    );
  }

  if (node.href) {
    return (
      <a href={node.href} className={className} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    );
  }

  return (
    <a href="#" className={className} onClick={(event) => event.preventDefault()}>
      {content}
    </a>
  );
}

function OrgChartHierarchyItem({
  node,
  parentId,
}: {
  node: OrgChartTreeNode;
  parentId?: string;
}) {
  const hasChildren = Boolean(node.children?.length);

  return (
    <li className="hierarchy">
      <div id={node.id} data-parent={parentId} className="node">
        <OrgChartNodeLink node={node} />
      </div>
      {hasChildren ? (
        <ul className={node.verticalChildren ? "nodes vertical" : "nodes"}>
          {node.children!.map((child) => (
            <OrgChartHierarchyItem key={child.id} node={child} parentId={node.id} />
          ))}
        </ul>
      ) : null}
    </li>
  );
}

export function OrgChartTree({ root }: { root: OrgChartTreeNode }) {
  return (
    <ul className="nodes">
      <OrgChartHierarchyItem node={root} />
    </ul>
  );
}
