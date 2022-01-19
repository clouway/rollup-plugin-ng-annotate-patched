import ngAnnotate from 'ng-annotate-patched'
import { createFilter } from '@rollup/pluginutils'

function annotatePlugin(opts) {
    let options = Object.assign({ add: true, remove: false, es6: true }, opts.config || {})
    const filter = createFilter(opts.include || '**/*.js', opts.exclude || 'node_modules/**')
    return {
        name: 'ng-annotate',
        transform: (code, id) => {
            if (!filter(id)) {
                return null
            }
            const output = ngAnnotate(code, options)
            if (output.errors) {
                output.errors.forEach(error => {
                    console.error(error)
                })
                return null
            }
            return {
                code: output.src,
                map: { mappings: '' }
            }
        }
    }
}


export default annotatePlugin