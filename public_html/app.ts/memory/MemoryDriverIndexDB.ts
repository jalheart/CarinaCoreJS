/**
 *
 * @author jalheart
 */
import { MemoryDriver} from './MemoryDriver';
import { BasicMemoryUnity} from './BasicMemoryUnity';
export class MemoryDriverIndexDB extends MemoryDriver{
    private _dataBase: IDBDatabase;        
    constructor(config:any){
        super(config);
    }
    public init(): Promise<boolean>{
        var _this   =this;
        return new Promise((resolve,reject)=>{
            var indexedDB:  IDBFactory      = window.indexedDB;// || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
            var dbRequest: IDBOpenDBRequest = indexedDB.open(_this.config['db']);
            dbRequest.onerror = function(event){
                reject(false);
            };
            dbRequest.onsuccess =function(e){
                var db:IDBDatabase= dbRequest.result;
                if (!db.objectStoreNames.contains(_this.config['tableName'])){//Si el objectstore no existe
                    var version: number = db.version+1;//Se aumenta en 1 la version de la BD
                    db.close();
                    var dbRequest2: IDBOpenDBRequest=indexedDB.open(_this.config['db'], version);
                    dbRequest2.onupgradeneeded = function(event){                            
                        db= dbRequest2.result;
                        db.createObjectStore(_this.config['tableName'], { keyPath:'_cue'});
                        db.close();
                        resolve(true);
                    }
                }else{
                    dbRequest.result.close();
                    resolve(true);
                }
            }
            dbRequest.onupgradeneeded = function(event){
                var db:IDBDatabase= dbRequest.result;
                db.createObjectStore(_this.config['tableName'], { keyPath:'_cue'});
                db.close();
                resolve(true);
            }        
        });
    }
    public storeInformation(information: BasicMemoryUnity): Promise<boolean>{
        var _this   =this;
        return new Promise((resolve,reject)=>{
            var indexedDB:  IDBFactory      = window.indexedDB;// || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
            var dbRequest: IDBOpenDBRequest = indexedDB.open(_this.config['db']);
            dbRequest.onsuccess =function(e){                
                var db:IDBDatabase= dbRequest.result;
                var request: IDBRequest  =db.transaction([_this.config['tableName']],"readwrite")
                                            .objectStore(_this.config['tableName'])
                                            .put(information);
                request.onerror=function(event){
                    resolve(false);
                }
                request.onsuccess=function(event){
                    resolve(true);
                }
            }
        });
    }
    public retrieveInformation(cue: string): Promise<BasicMemoryUnity>{
        var _this   =this;
        return new Promise((resolve,reject)=>{
            var indexedDB:  IDBFactory      = window.indexedDB;// || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
            var dbRequest: IDBOpenDBRequest = indexedDB.open(_this.config['db']);
            dbRequest.onsuccess =function(e){
                var db:IDBDatabase= dbRequest.result;
                var request: IDBRequest  =db.transaction([_this.config['tableName']])
                                            .objectStore(_this.config['tableName'])
                                            .get(cue);
                request.onerror=function(event){                    
                    reject(null);
                }
                request.onsuccess=function(event){
                    if (request.result){
                        resolve(new BasicMemoryUnity(request.result._cue, request.result._information));
                    }else{
                        resolve(null);
                    }
                }
            }
        });
    }
    public forgetInformation(cue: string): Promise<boolean>{
        var _this   =this;
        return new Promise((resolve,reject)=>{
            var indexedDB:  IDBFactory      = window.indexedDB;// || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
            var dbRequest: IDBOpenDBRequest = indexedDB.open(_this.config['db']);
            dbRequest.onsuccess =function(e){
                var db:IDBDatabase= dbRequest.result;
                var request: IDBRequest  =db.transaction([_this.config['tableName']],"readwrite")
                                            .objectStore(_this.config['tableName'])
                    .delete(cue);
                request.onerror=function(event){
                    resolve(false);
                }
                request.onsuccess=function(event){
                    resolve(true);
                }
            }
        });
    }        
}