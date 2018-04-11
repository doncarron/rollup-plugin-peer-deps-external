import { either, pipe } from 'ramda';
import externalToFn from './external-to-fn';
import getModulesMatcher from './get-modules-matcher';
import getPeerDeps from './get-peer-deps';
import getDeps from './get-deps';

export default function PeerDepsExternalPlugin({packageJsonPath, doIncludeDeps} = {}) {
  let deps = getPeerDeps(packageJsonPath);

  if(doIncludeDeps) {
    deps = deps.concat(getDeps(packageJsonPath))
  }

  return {
    name: 'peer-deps-external',
    options: opts => {
      opts.external = either(
        // Retain existing `external` config
        externalToFn(opts.external),

        // Add `peerDependencies` to `external` config
        getModulesMatcher(deps)
      );

      return opts;
    },
  };
}
