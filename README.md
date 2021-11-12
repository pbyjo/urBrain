# Curso introducción a React

### Introducción

#### Cómo aprender React.js

Importante tener las bases para pasar a React, y checar el curso de librerias y frameworks.

#### Cuándo usar React.js

Cuando necesitamos componentizar nuestra app y crear funciones especificas y completas dentro de un componente. y Asi ir midiendo la usabilidad a medida que crece.

Básicamente un componente es un pedacito de tu página web, es decir, puede ser una sección específica de tu página web, o puede ser algún elemento que se repita múltiples veces en la misma. Lo importante a tener en cuenta es que, un componente es una parte específica de tu página, es algo que cumple una acción simple 👀.

¿El header de mi página puede ser un componente? ¡Sí!
¿El sidebar puede ser un componente? ¡Por su puesto!
Y si tengo varios articulos en mi página… ¿Puedo convertirlos a componentes? ¡Por su pollo! 😄

Recuerda que todo puede ser un componente, y esto nos permite modularizar nuestro código. Es decir, podemos dividir y “aislar” cada parte de nuestra página. Si por alguna razón necesitaramos actualizar nuestro header (por ejemplo), bastaría con entrar al componente header modificar una pequeña línea y listo! Ya no tendríamos que buscar el header dentro de tooooodo nuestro HTML UwU.

👀 Otra ventaja de los componentes es que son reutilizables, es decir, puedes usarlos cuantas veces quieras. Por ejemplo, si tuvieras un sitio web sobre blogs, ya sabes que muchos blogs suelen tener una imagen, un título y una descripción. Entonces podríamos crear un componente con la estructura de nuestro blogpost y únicamente mandarle la información que necesitemos por cada blogpost y cada uno se crearía automáticamente!!

**En este curso crearemos un TODO, de tal forma poder manejar componentes y sus estados y ver como se construye una app básica con React**

#### Instalación con Create React App

**!IMPORTANT**
Aqui podriamos usar create react app y ya está

pero haré una excepcion y configuraré react desde cero con webpack. Asi que en esta pausa de la clase habrá una mini guia para configurar webpack de la forma más optima

    => npm init
    => src directory
    => index.js
    => npm install --save-dev webpack webpack-cli
            cli => command line interface, un comando
            que podemos utilizar en la consola para facilitar procesos.

    => script: "build" : "webpack"
    => podemos configurar el modo `webpack --mode=development`

Webpack por defecto ya conoce de donde tiene que transpilar la info del punto de entrada que es src/index y lo exporta a la carpeta dist

Ahora bien podemos configurar el nombre de la carpeta output en este caso llama dist

Aqui viene lo interesante, en el archivo `webpack.config.js` podemos empezar a configurar todas las funcionalidades de webpack.

    => `npm i react react-dom -E`

Instalamos react y react-dom para ahora si trabajar nuestra aplicación

Webpack de por si no entiende etiquetas de componentes personalizados, como lo es `<App />`
`
Aqui llega el concepto de `loader` o cargador`:
es una herramienta que transforma codigo y hará que lo entienda webpack para luego lo cargue el navegador.

En este caso BABEL entenderá la sintaxis de jsx y lo transpilará a js

hacemos nuestra configuracion del loader:

``` js
    ... 
    /* loaders */
    module : {
        // reglas
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-react']
                }
            }
        ]
    }
    ...
```

instalamos: `npm install @babel/core babel-loader @babel/preset-react --save-dev`

tenemos loaders de todo tipo, babel-loader, ts-loader, sass-loader, svg-loader, node-loader, etc.

--- . ---
**jsx runtime en reemplazo de import react**
Hacer un import react from 'react' es una mala practica a dia de hoy. Next js ya lo optimiza.

configuremos esta observacion de la forma optima.

``` js
    ...
    presets: [
        [
            '@babel/preset-react',
            {
                runtime: 'automatic' // 'classic'
            }
        ]
    ]
    ...
```

Con ello nos ahorramos lineas de código y además no tenemos que estar importanto react en cada uno de nuestros componentes.

--- . ---
**Refactorizando la configuración de webpack**

Para aplanar un poco el código de la config.js podriamos refactorizarm la config en constantes diferentes para hacer un poco más entendible el código.

chequear el archivo `webpack.config.js`

--- . ---
**Trabajando con CSS**

Necesitamos crear un nuevo loader para poder cargar css a webpack ya que no lo entiende. 

En realidad necesitaremos instalar dos: `style-loader y css-loader`;

nota: css-loader entenderia las imagenes que utilizo en el css con url();

El style-loader va a entender los estilos y va a cargarlo en el navegador, lo deja en el html con una etiqueta <style>.

--- . ---
**Plugin para transpilar html**

Aqui entra el concepto de plugins, en este caso para manejar html en nuestra carpeta de production.

Estos añaden funcionalidad a webpack, quiero generar un archivo html

`npm i html-webpack-plugin --save-dev`

!important una vez se genera el html en la carpeta final le quitamos el enlace script manual ya que este plugin lo agrega automáticamente y nos facilita algunos problemas de ruta en futuros cambios.

--- . ---
**Entorno de desarrollo con webpack-dev-server**
Para automatizar el servidor y que genere los cambios en tiempo real instalamos `npm i -D webpack-dev-server`.

y creamos scripts:
`"sever:prod": "webpack serve --mode=production"`
`"sever:dev": "webpack serve --mode=development"`

podriamos tambien agregarle configuración al webpack server

``` js
    ...
    devServer: {
        open: false,
        port: 3000,
        compress: true,
        // more ...
    }
```

**Source map en webpack**
Una forma de leer los errores de nuestro código en la linea correcta dependiendo de si se esta visualizando del lado del cliente o en el código original no transpilado.

`devtool: 'source-map'`

hacer spurce-map es bastante costoso en recursos de cpu

*Minificar el código*
--mode=production

**Hashing**
El hasheo nos permite generar un hash como nombre de archivo a cada archivo transpilado, con ello podemos optimizar temas de cache

Para poder hashear lo que podemos hacer primero es diferenciar desarrollo de producción para que en produccion tengamos hashing pero en el modo devlp no.

Podemos convertir nuestro `module.exports` como objeto en una fn que return las diferentes configuraciones y además de eso crear condicional para hashear el punto de salida dependiendo del modo que queremos hashear

nota: normalmente hariamos esto creando un nuevo archivo de config, por lo general :
webpack.config.dev.js

hasta aqui seria nuestra configuracion básica de webpack, importante siempre leer la configuración webpack para ver todas las funciones creadas aqui.

faltarian un par de configuraciones que me gustaria agregar como generar el css en un archivo independiente y crear subcarpetas para archivos de tipo multimedia, svg's, etc.

### M2_ Fundamentos de React: maquetación

#### Componentes vs elementos (y props vs atributos)

Los componentes pueden ser clases o funciones que retornan elemntos html mas conocido como etiquetas, los componentes se pueden reutilizar cuantas veces queramos, para ello llegan las props, que pudemos pasar como parametros a las funciones. 

Existe una propiedad llamada children que pasa como props lo que esté dentro de un elemento padre <App> saludo => {children} </App> y tambien se puede pasar como prop hacia un componente.

``` js
const e = React.createElement()

function App() {
    return(
        React.createElement('h1', {id: title}, 'Welcome')
    );
}

ReactDOM.render(e())

// este es la lógica primitiva de react, con la que se puede trabajar en js vanilla
```

#### Componentes de TODO Machine

Definimos cuales van a ser los componentes para la lista de tareas, importante tener en cuenta las props, y los datos desestructurarlo fuera de nuestros componentes para crear un estado mas adelante.

Diccionario: props, key, map, children, Fragment, desestructuración

#### CSS en react

Trabajaremos con css según nuestro gusto, en este caso uso sass-loader para leer los archivos del preprocesador con webpack

### M3_ Fundamentos de react: interacción

#### Manejo de eventos

Podemos atrapar las acciones del usuario en funciones que luego podemos pasar como atributos o propiedades.

podemos escuchar literal cualquier accion mediante los atributos on
<!-- onChange, onClick, ... -->

En el buscador la clave esta en la palabra reservada event en la que existen un monton de propiedades para detectar el input de nuestro buscador, `event.target.value`

#### Manejo del estado

El estado nos permite cambiar el contenido mediante los eventos, los eventos y el estado van de la mano, lo que permite que nuestros datos sean dinamicos según que cambios o acciones se ejecuten en los componentes.

El estado se transmite a todos los componentes en un componente padres mediante los props

```js
const estado = React.useState(); // Estado inicial

-- . --
// Con clases
class Componente extends React.Component {
    constructor() {
        this.state = {
            Tarea1 = 'Curso de Intro a React',
        }
    }

    render() {
        return(
            <div onClick={() => this.setState('Curso de intro al DOM')} >{this.state.Tarea1}</div>
        )
    }
}
// En la actualidad no se trabaja con classes, ahora react nos permite trabajar con funciones como componentes.

/* react hooks */
const [Tarea1, setTarea1] = React.useState('Curso de Intro a React')

[
    'Curso de Intro a React', // Posición 0 => nuestro state inicial
    setState('Curso de Intro al DOM'); // Posición 1 => Funcion que determinar el nuevo state.
]

// osea que nos queda
import React, {useState} from 'react';
const [state, setState] = useState('') // state inicial

const onValorDigitado = () => {

    setState(event.target.value) //setState es la funcion que constantemente esta escuchando el valor actual para pasarselo al state y este re renderice en el DOM

    return [
        <input
            value={setState}
            onChange={onValorDigitado}
        >
        </input>,
        <p> {state} </p>
    ]
}

```

#### Contando y buscando TODO's

Una vez teniendo la lógica de la seccion anterior, necesitamos migrar esta logica de estados al componente padre, que por lógicas razones nos permite reutilizar esta funcion y comunicarlo con todos los componentes hijos.

App.js
```js 
    ...
    /* Estado del buscador */
    const [state, setState] = useState('')

    return (
        <Tsearch 
            state={state}
            setState={setState}
        />
    )
    ...
```

Las tareas tambien necesitan cambiar su estado por lo que necesitamos usar useState para ello.

``` js
    ...
    /* Estado de los datos */
    const [tasks, setTasks] = useState(taskList)
```

Validamos las tareas completadas por medio de un filter:
``` js
    const taskCompleted = tasks.filter(task => !!task.completed).length;
    const totalTasks = tasks.length;

    <Tcounter 
        total={totalTasks}
        completed={taskCompleted}
    /> 
```

ademas de ello contamos el total de tareas guardadas y estas dos constantes las pasamos por props a nuestro contenedor counter.

Finalmente la condicional que filtra e incluye las tareas que coincidan con lo digitado en el buscador
``` js 
    let TasksSearched = [];

    if(!state.length >= 1) {
        TasksSearched = tasks
    } else {
            TasksSearched = tasks.filter(task => {
            const taskText = task.text.toLowerCase()
            const searchText = state.toLowerCase()
            return taskText.includes(searchText);
        })

```

#### Completando y eliminando TODOs

para validar si hemos completado o no alguna tarea mediante el input check creamos una función

``` js
    ...
    const checkTask = (text) => {
            const taskIndex = tasks.findIndex(task => task.text === text);

            const newTaskList = [...tasks]

            newTaskList[taskIndex].completed = !newTaskList[taskIndex].completed

            /* Actualizar el estado */
            setTasks(newTaskList);
    }

    <Titem 
        onComplete={() => checkTask(task.text)}
    />
```

y para eliminar tareas tenemos una funcion parecida, exceptuando la validacion de si se ha completado o no, reemplazamos esa fn por splice que nos permite eliminar la tarea escogida, le pasamos por parametro el index de la misma y la cantidad que vamos a eliminar.

``` js
    ...
    /* Método para eliminar TODOs */

    const deleteTask = (text) => {
        const taskIndex = tasks.findIndex(task => task.text === text);

        const newTaskList = [...tasks]
        newTaskList.splice(taskIndex, 1)

        /* Actualizar el estado */
        setTasks(newTaskList);
    }

    <Titem 
        onDelete={() => deleteTask(task.text)}
    />
```

### M4_ Fundamentos de React: escalabillidad

#### Organización de archivos y carpetas

Organizamos de la forma mas optima la carpeta src y además creamos un container con un componente que presente todos nuestros componentes hijos, de tal forma que este solo sea presentacional dejando asi la lógica solo en App.jss

#### Persistencia de datos con Local Storage

Nos permite guardar y recibir la información que nosotros queramos y mantenerla activa durante bastante tiempo en el navegador.

``` js
/* local storage solo puede guardar texto. */
localStorage.setItem('ejTodos', )

JSON.stringify(/* Nos permite convertir a texto */)
JSON.parse(/* Nos permite parsear a su valor original  */)

const ejemplo = JSON.stringify(
    [
        {
            text:'todos',
            completed: false,
        }
    ]
)

JSON.parse(ejemplo)

localStorage.setItem('ejemploTodos', ejemplo)
JSON.parse(localStorage.setItem('ejemploTodos'))
```

``` js
/* --- Local storage */
    const localStorageTasks = localStorage.getItem('TaskList_V1');
    let parsedTasks;

    if(!localStorageTasks) {
        localStorage.setItem('TaskList_V1', JSON.stringify([]));
        parsedTasks = [];
    } else {
        parsedTasks = JSON.parse(localStorageTasks)
    }
    
/* Persistir datos */
    const saveTasks = (newTasks) => {
        const stringifiedTasks = JSON.stringify(newTasks);
        localStorage.setItem('TaskList_V1', stringifiedTasks);
        setTasks(newTasks);
    }
```

También se puede invocar o modificar las propiedades de localStorage como si se tratara de un objeto de JS, es decir:

localStorage.getItem(‘TODOS_V1’) = localStorage.TODOS_V1
localStorage.setItem(‘TODOS_V1’, []) = localStorage.TODOS_V1 = []

Limpiar completamente el local storage
`localStorage.clear();`

RemoveItem elimina el elemento
`localStorage.removeItem('nombre','Juan');`

setItem añade el elemento
`localStorage.setItem('nombre','Juan');`

getItem obtienes el elemento
`const nombre = localStorage.getItem('nombre');`

Session Storage.
Se borra todo cuando cierras el navegador
`sessionStorage.setItem('apellido','meap');`

#### Custom Hook para Local Storage

Creamos una fn en un nuevo modulo para crear el custom hook básicamente pasando la lógica del local storage a esta fn
y desde App le pasamos como parametro 'TASKS_V1, []' y un array vacio como estado inicial.

Esto nos permite reutilizar el hook y su lógica para futuros nuevos estados.

#### Manejo de efectos (eventos externos)

tres estados de carga,

- Cargando la info
- error de carga
- sunccesfully

Para manejar estos estados y simular tiempos de espera creamos una fake api.

`useEffect`
Este hook nos permite ejecutar el código que ejecutemos dentro justo antes de que react tiene todo preparado para renderizar los componentes

```js
React.useEffect( // recibe dos parametros
    () => {
        console.log('use effect')
    },

    [totalTasks]
) 
```

cada vez que hay un cambio en el estado use effect se ejecuta por cada uno de estos cambios generados por el usuario, si quiero darle condicionales para que se ejecute solo en cierta funcion podemos pasarle como segundo parametro esa funcion que lo ejecutara.

Por ejemplo si condionamos useEffect para que detecte solo cambios en la longitud de totalTasks y cambiamos la longitud de esta lista eliminando o agregando una tarea entonces nuestro useEffect se ejecutaría.

en la AppUI.js creamos unas condiciones de carga para el componente de la lista de tareas.

``` js
<Tlist>
    {error && <p>tenemos un error...vuelve en minutos.</p>}
    {loading && <p>loading...</p>}
    {(!loading && !TasksSearched.length) && <p>Crea tu primer tarea...</p>}
    ...
```

En el hook creamos estados para los errores y el estado de carga
``` js
    /* Eventos */
    /* verdadero hasta que carguen todos los items */
    const [loading, setLoading] = useState(true)
    /* false hasta que se dispare un error */
    const [error, setError] = useState(false)
```

usamos setTimeOut para simular el tiempo de carga de los datos y un try catch para manejar los errores en caso de.
Se lo comunicamos al componente principal retornando estos dos estados. App.js los recibe y los utiliza en la funcion de useLocalStorage,
finalmente se los pasamos a el Componente UI como atributos que es el que presenta estos estados en el DOM.

#### Providers (Simplificando el flujo de la información) React Context: estado compartido

React Context nos permite crear providers y consumers ppara que nuestro estado se pueda compartir entre todos los componentes,
dejando asi las props entre componentes, ya que en escalabilidad se puede volver caotico.

``` js
import React, {createContext} from 'react';

const {Provider, Consumer } = createContext();

const tasksProvider(props) {
    return (
        <Provider
            value={
                {
                    
                }
            }
        >
            {props.children}
        </Provider>
    )
}
```
``` js 
<MyContext.Consumer>
    {
        value => (
        <Tlist>
            {value.error && <p>tenemos un error...vuelve en minutos.</p>}
            {value.loading && <p>loading...</p>}
            {(!value.loading && !value.TasksSearched.length) && <p>Crea tu primer tarea...</p>}

            {value.TasksSearched.map(task => (
                <Titem 
                    key={task.index}
                    text={task.text} 
                    completed={task.completed}
                    /* -- .-- */
                    onComplete={() => value.checkTask(task.text)}
                    onDelete={() => value.deleteTask(task.text)}
                />
            ))}
        </Tlist>
        )
    }
</MyContext.Consumer>
```

#### useContext

useContext es un react hook, es una alternativa a Consumer, 

No consumimos las props de value directamente en el componente mediante `<MyContext.Consumer` sino que con useContext() le pasamos como parametro MyContext y desestructuramos las props. Asi podemos pasar el estado y la informacion directamente a cada componente

Ejemplo:
``` js
import {useState} from '/'
import MyContext from '/'

function app() {
    const {...props} = useContext(MyContext);
}
```

### M_ Modales y formularios 
#### Portales: teletransportación de componentes

react portals, una herramienta de react para crear 'portales' que permiten 'teletransportar componentes' y renderizarlos en un nodo por separado, perfecto para crear modales y poderlo comunicar con otros nodos. `ReactDOM.createPortal`

``` js 
return 
    ReactDOM.createPortal(
        <div className="ModalContainer">
            {children}

            <button 
            className="ModalContainer__close buttonMain"
            onClick={click}
            > 
                X 
            </button>

        </div>,

        document.getElementById('modal')
    )
```

Creamos un estado para el modal, cuando este se encuentre activo u oculto.

``` js
/* --- Estado del modal */
    const [openModal, setOpenModal] = useState(false);
```

Le damos como valor inicial falso, con ello podemos crear un condicional en el componente para validar el estado y asi imprimirlo en el DOM

Como hijo le pasamos el componente form, dentro de AppUI.js
``` js 

<CreateTask
    setOpenModal= {setOpenModal}
/>

{
    !!openModal && (
        <Modal>
            <Tform />
        </Modal>
    )
}
```

En nuestro botón `CreateTask` cambiamos el estado con un metodo onCLick, setOpenModal se encargara de ello.

```js
function CreateTask() {

    const { openModal, setOpenModal } = useContext(MyContext);

    const click = () => {
        setOpenModal(!openModal); 
        // !important, !openModal nos permite añadir y quitar el modal, ya que la acción llamara siempre el estado contrario del actual.
    }

    return(
        <button className="buttonMain"
            onClick={click}
        > 
        </button>
    )
}

export default CreateTask;
```

#### Formulario para crear TODOs

Creamos un componente para el contenido del formulario, este irá como hijo del componente modal, con ello podemos reutilizar el modal con otros componentes.

El formulario lo seteamos para que no recargue la pagina al enviar los datos 

``` js 
const onSubmit = (event) => {
        event.preventDefault() // cancelamos la recarga de pagina
        addTask(newTaskValue) // añadimos mediante newTaskValue la tarea que digitamos y se la pasamos al método addTask que se encuentra en MyConterxt
        setOpenModal(!openModal) // Cuando enviamos una tarea nuestro modal se cierra gracias al true operator
    }
```

#### useContext vs useState

useContext permite crear una libreria de todos nuestros estados de la aplicaci[on] en donde podemos guardar todas las funciones `useState`

Con ello podemos usar en cada componente estos estados mediante `useContext(MyContext) = {}` desestructurando exclusivamente los estados a importar.

``` js 
import { MyContext } from '../contexto/context';
const {state, setState} = useContext(MyContext);
```

Mientras que si usamos useState localmente en un componente usamos directamente el state y setState en una constante como array

``` js 
import { useState } from 'react';
const [state, setState] = useState('', [], //wathever);
```

#### Deploy

































