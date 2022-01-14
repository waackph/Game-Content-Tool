
# Functional Requirements
- Choose an object in the world from a defined, finite set of possible objects in the world (things).
- The objects data can be filled with standard types such as integer, float, string
- The objects data can be filled with other objects that are defined by the objects data fields (the object data is a subset of objects (such as item can be either a door or a key, a cominedItem and so on))
- An object or a data field of an object must be deletable or modifiable.
- The data that needs to be stored is limited to data fields that may change over time and show progress or that is essential for the initialization of an object.

# Logical/Datastructure Requirements
- Each object needs to have an unique ID that can be referenced by other objects.

# UI Requirements
- Object data can be nested (object in an object in an object), this needs to be displayed in a usable way.
- It needs to be differed between objects in a world (Thing) and Sequences in contrary to Thoughts and Dialog. A Thing or Sequence should have a rather limited amount of other objects, hence a shallow hierarchy. Thoughts and Dialog are inherently hierarchically structured. Hence we need two different ways of displaying the information. The first needs to be more like a typical mask or page with potential subpages, while for the latter it should be visibly shown which Subthoughs or Dialog Option are connected. 

